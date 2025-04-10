from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from quests.models import Quest, QuestCompletion, UserStats
from quests.serializers.quest_serializers import QuestSerializer, QuestCompletionSerializer
from quests.utils.achievement_checker import check_achievements
from quests.utils.title_checker import check_titles
from datetime import date, timedelta

User = get_user_model()

class QuestViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer

class QuestCompletionViewSet(viewsets.ModelViewSet):
    queryset = QuestCompletion.objects.all()
    serializer_class = QuestCompletionSerializer

    def create(self, request, *args, **kwargs):
        user = User.objects.first()  # 로그인 전
        quest_id = request.data.get('quest')
        quest = Quest.objects.get(id=quest_id)

        # 이미 오늘 완료한 퀘스트인지 확인
        today = date.today()
        if quest.quest_type == 'daily':
            exists = QuestCompletion.objects.filter(user=user, quest=quest, completed_at__date=today).exists()
        elif quest.quest_type == 'weekly':
            start_of_week = today - timedelta(days=today.weekday())
            exists = QuestCompletion.objects.filter(user=user, quest=quest, completed_at__date__gte=start_of_week).exists()
        elif quest.quest_type == 'monthly':
            exists = QuestCompletion.objects.filter(user=user, quest=quest, completed_at__year=today.year, completed_at__month=today.month).exists()
        else:
            exists = False

        if exists:
            return Response({'error': '이미 완료한 퀘스트입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 완료 처리
        QuestCompletion.objects.create(user=user, quest=quest)

        stats, _ = UserStats.objects.get_or_create(user=user)
        stats.experience += quest.experience
        stats.coin += quest.coin
        stats.check_level_up()
        stats.save()

        check_achievements(user)
        check_titles(user)

        return Response({
            'message': '퀘스트 완료!',
            'experience': stats.experience,
            'coin': stats.coin,
            'level': stats.level,
        })