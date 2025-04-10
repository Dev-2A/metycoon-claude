from rest_framework import viewsets
from django.contrib.auth import get_user_model
from quests.models import UserAchievement
from quests.serializers.achievement_serializers import UserAchievementSerializer

User = get_user_model()

class UserAchievementViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserAchievementSerializer
    queryset = UserAchievement.objects.all()

    def get_queryset(self):
        user = User.objects.first()  # 로그인 구현 전까지는 첫 번째 유저 기준
        return UserAchievement.objects.filter(user=user).order_by('-unlocked_at')