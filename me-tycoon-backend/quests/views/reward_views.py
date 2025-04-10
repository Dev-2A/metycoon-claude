from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from quests.models import Reward, UserReward, UserStats
from quests.serializers.reward_serializers import RewardSerializer, UserRewardSerializer
from quests.utils.achievement_checker import check_achievements
from quests.utils.title_checker import check_titles

User = get_user_model()

class RewardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer

class UserRewardViewSet(viewsets.ModelViewSet):
    queryset = UserReward.objects.all()
    serializer_class = UserRewardSerializer

    def create(self, request, *args, **kwargs):
        user = User.objects.first()
        reward_id = request.data.get('reward')
        
        try:
            reward = Reward.objects.get(id=reward_id)
        except Reward.DoesNotExist:
            return Response({'error': '보상을 찾을 수 없습니다.'}, status=404)

        stats, _ = UserStats.objects.get_or_create(user=user)

        if stats.coin < reward.cost:
            return Response({'error': '코인이 부족합니다.'}, status=400)

        # 보상 구매 처리
        stats.coin -= reward.cost
        stats.save()

        user_reward = UserReward.objects.create(user=user, reward=reward)

        check_achievements(user)
        check_titles(user)

        return Response({
            'message': '보상 구매 완료!',
            'reward': reward.name,
            'coin': stats.coin,
        })
    
    def destroy(self, request, *args, **kwargs):
        """보상 사용 (삭제)"""
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)