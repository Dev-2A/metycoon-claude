from datetime import timedelta
from django.utils.timezone import now
from quests.models import Title, UserTitle, QuestCompletion, UserStats, UserReward
from django.contrib.auth.models import User


def check_titles(user: User):
    stats, _ = UserStats.objects.get_or_create(user=user)
    today = now().date()
    
    total_completions = QuestCompletion.objects.filter(user=user).count()
    daily_completions = QuestCompletion.objects.filter(user=user, quest__quest_type='daily').count()
    weekly_completions = QuestCompletion.objects.filter(user=user, quest__quest_type='weekly').count()
    total_rewards = UserReward.objects.filter(user=user).count()
    coin = stats.coin
    
    streak = 0
    for i in range(7):
        day = today - timedelta(days=i)
        count = QuestCompletion.objects.filter(user=user, completed_at__date=day).count()
        if count > 0:
            streak += 1
        else:
            break
    
    today_count = QuestCompletion.objects.filter(user=user, completed_at__date=today).count()
    
    unlocked_ids = UserTitle.objects.filter(user=user).values_list('title_id', flat=True)
    titles = Title.objects.exclude(id__in=unlocked_ids)
    
    for title in titles:
        ctype = title.condition_type
        cval = title.condition_value
        
        if(
            (ctype == 'level_reach' and stats.level >= cval) or
            (ctype == 'quest_complete_count' and total_completions >= cval) or
            (ctype == 'daily_quest_count' and daily_completions >= cval) or
            (ctype == 'weekly_quest_count' and weekly_completions >= cval) or
            (ctype == 'reward_buy_count' and total_rewards >= cval) or
            (ctype == 'coin_collect' and coin >= cval) or
            (ctype == 'consecutive_days' and streak >= cval) or
            (ctype == 'one_day_quest_count' and today_count >= cval)
        ):
            UserTitle.objects.create(user=user, title=title)