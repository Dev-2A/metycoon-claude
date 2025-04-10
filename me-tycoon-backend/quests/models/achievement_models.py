from django.db import models
from django.conf import settings

class Achievement(models.Model):
    CONDITION_CHOICES = [
        ('quest_complete_count', '퀘스트 완료 횟수'),
        ('level_reach', '레벨 도달'),
        ('reward_buy_count', '보상 구매 횟수'),
        ('coin_collect', '보유 코인 수'),
        ('daily_quest_count', '일일 퀘스트 완료 누적 수'),
        ('weekly_quest_count', '주간 퀘스트 완료 누적 수'),
        ('consecutive_days', '연속으로 퀘스트를 완료한 날 수')
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    condition_type = models.CharField(max_length=30, choices=CONDITION_CHOICES)
    condition_value = models.PositiveIntegerField()
    
    def __str__(self):
        return self.name
    
    class Meta:
        app_label = 'quests'

class UserAchievement(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.achievement.name}"
    
    class Meta:
        app_label = 'quests'

class Title(models.Model):
    CONDITION_CHOICES = [
        ('level_reach', '레벨 도달'),
        ('quest_complete_count', '전체 퀘스트 완료 수'),
        ('daily_quest_count', '일일 퀘스트 완료 수'),
        ('weekly_quest_count', '주간 퀘스트 완료 수'),
        ('reward_buy_count', '보상 구매 수'),
        ('consecutive_days', '연속 완료 일수'),
        ('coin_collect', '보유 코인 수'),
        ('one_day_quest_count', '하루 완료 수'),
    ]
    
    name = models.CharField(max_length=50)
    description = models.TextField()
    condition_type = models.CharField(max_length=30, choices=CONDITION_CHOICES)
    condition_value = models.PositiveIntegerField()
    
    def __str__(self):
        return self.name
    
    class Meta:
        app_label = 'quests'


class UserTitle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.ForeignKey(Title, on_delete=models.CASCADE)
    equipped = models.BooleanField(default=False)
    unlocked_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.title.name}"
    
    class Meta:
        app_label = 'quests'