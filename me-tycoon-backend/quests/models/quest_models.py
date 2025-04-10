from django.db import models
from django.conf import settings

class Quest(models.Model):
    QUEST_TYPE_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('event', 'Event'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    quest_type = models.CharField(max_length=10, choices=QUEST_TYPE_CHOICES)
    experience = models.PositiveIntegerField(default=10)
    coin = models.PositiveIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"[{self.quest_type}] {self.title}"
    
    class Meta:
        app_label = 'quests'

class QuestCompletion(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} 완료한 {self.quest.title}"
    
    class Meta:
        app_label = 'quests'