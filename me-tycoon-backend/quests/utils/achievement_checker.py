from datetime import timedelta
from django.utils.timezone import now
from quests.models import QuestCompletion, UserReward, UserAchievement, Achievement, UserStats

def check_achievements(user):
    stats, _ = UserStats.objects.get_or_create(user=user)

    total_completions = QuestCompletion.objects.filter(user=user).count()
    daily_completions = QuestCompletion.objects.filter(user=user, quest__quest_type='daily').count()
    weekly_completions = QuestCompletion.objects.filter(user=user, quest__quest_type='weekly').count()
    total_rewards = UserReward.objects.filter(user=user).count()
    
    today = now().date()
    streak = 0
    for i in range(7):
        day = today - timedelta(days=i)
        count = QuestCompletion.objects.filter(user=user, completed_at__date=day).count()
        if count >0:
            streak += 1
        else:
            break
    
    unlocked_ids = UserAchievement.objects.filter(user=user).values_list('achievement_id', flat=True)
    achievements = Achievement.objects.exclude(id__in=unlocked_ids)

    for ach in achievements:
        if (
            (ach.condition_type == 'quest_complete_count' and total_completions >= ach.condition_value) or
            (ach.condition_type == 'level_reach' and stats.level >= ach.condition_value) or
            (ach.condition_type == 'reward_buy_count' and total_rewards >= ach.condition_value) or
            (ach.condition_type == 'daily_quest_count' and daily_completions >= ach.condition_value) or
            (ach.condition_type == 'weekly_quest_count' and weekly_completions >= ach.condition_value) or
            (ach.condition_type == 'consecutive_days' and streak >= ach.condition_value)
        ):
            UserAchievement.objects.create(user=user, achievement=ach)