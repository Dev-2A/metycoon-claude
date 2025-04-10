from django.db import models
from django.conf import settings

class Reward(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    cost = models.PositiveIntegerField(default=10)
    
    def __str__(self):
        return f"{self.name} ({self.cost}코인)"
    
    class Meta:
        app_label = 'quests'

class UserReward(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE)
    acquired_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} -> {self.reward.name}"
    
    class Meta:
        app_label = 'quests'