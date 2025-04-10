from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from quests.models.theme_models import Theme

class UserStats(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    experience = models.PositiveIntegerField(default=0)
    coin = models.PositiveIntegerField(default=0)
    level = models.PositiveBigIntegerField(default=1)
    
    def __str__(self):
        return f"{self.user.username} - Lv.{self.level}"
    
    def check_level_up(self):
        level = 1
        total_exp = self.experience
        while total_exp >= self.exp_required_for(level + 1):
            level += 1
        self.level = level
        self.save()
    
    def exp_required_for(self, level):
        return 100 * ((level - 1) * level) // 2
    
    class Meta:
        app_label = 'quests'

class CustomUser(AbstractUser):
    themes = models.ManyToManyField(Theme, blank=True) # 보유 테마 목록
    applied_theme = models.ForeignKey(Theme, null=True, blank=True, on_delete=models.SET_NULL, related_name='applied_users')
    
    def __str__(self):
        return self.username
    
    class Meta:
        app_label = 'quests'