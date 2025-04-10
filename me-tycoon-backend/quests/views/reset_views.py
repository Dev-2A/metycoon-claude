from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from quests.models import UserStats, QuestCompletion, UserReward, UserAchievement, UserTitle

User = get_user_model()

@api_view(['POST'])
def reset_user_state(request):
    user = User.objects.first()  # 로그인 구현 전까지는 고정 유저 사용

    # 1. 유저 상태 초기화
    stats, _ = UserStats.objects.get_or_create(user=user)
    stats.level = 1
    stats.experience = 0
    stats.coin = 0
    stats.save()

    # 2. 완료한 퀘스트 초기화
    QuestCompletion.objects.filter(user=user).delete()

    # 3. 구매한 보상 초기화
    UserReward.objects.filter(user=user).delete()

    # 4. 해금한 업적 초기화
    UserAchievement.objects.filter(user=user).delete()
    
    # 5. 획득한 칭호 초기화
    UserTitle.objects.filter(user=user).delete()

    return Response({'message': '유저 상태 초기화 완료!'})