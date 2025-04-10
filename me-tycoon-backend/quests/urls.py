# quests/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# ViewSets 분리된 파일에서 import
from quests.views.quest_views import QuestViewSet, QuestCompletionViewSet
from quests.views.reward_views import RewardViewSet, UserRewardViewSet
from quests.views.stats_views import UserStatsViewSet, quest_completion_stats, weekly_quest_history, monthly_stats, quest_type_stats, top_quests, best_exp_day, best_coin_spent_day, summary_stats, QuestHeatmapView
from quests.views.achievement_views import UserAchievementViewSet
from quests.views.reset_views import reset_user_state
from quests.views.title_views import UserTitleViewSet
from quests.views.theme_views import ThemeViewSet
from quests.views.auth_views import RegisterView, get_user_info, change_password, update_profile

router = DefaultRouter()
router.register(r'quests', QuestViewSet)
router.register(r'quest-completions', QuestCompletionViewSet)
router.register(r'rewards', RewardViewSet)
router.register(r'user-rewards', UserRewardViewSet)
router.register(r'stats', UserStatsViewSet)
router.register(r'user-achievements', UserAchievementViewSet)
router.register(r'user-titles', UserTitleViewSet)
router.register(r'themes', ThemeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('quest-stats/', quest_completion_stats),  # GET 요청으로 퀘스트 완료 통계
    path('quest-history/', weekly_quest_history),  # GET 요청으로 주간 퀘스트 완료 통계
    path('monthly-stats/', monthly_stats), # 유저 통계
    path('quest-type-stats/', quest_type_stats), # 퀘스트 세부 통계
    path('top-quests/', top_quests),
    path('best-exp-day/', best_exp_day),
    path('best-coin-day/', best_coin_spent_day),
    path('summary-stats/', summary_stats),
    
    path('register/', RegisterView.as_view(), name='register'), # 회원가입
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # 로그인
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # 토큰 갱신
    path('user-info/', get_user_info, name='user_info'),
    path('change-password/', change_password, name='change_password'),
    path('update-profile/', update_profile, name='update-profile'),
    path('quest-heatmap/', QuestHeatmapView.as_view(), name='quest-heatmap'),
    
    path('reset/', reset_user_state),  # POST 요청으로 초기화
]