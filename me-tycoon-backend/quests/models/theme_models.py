from django.db import models

class Theme(models.Model):
    THEME_CHOICES = [
        ('default', '기본'),
        ('dark', '다크'),
        ('pastel', '파스텔'),
        ('neon', '네온'),
        ('forest', '숲'),
        ('ocean', '바다'),
        ('sunset', '석양'),
        ('space', '우주'),
        ('bubblegum', '버블껌'),
        ('matrix', '매트릭스'),
        ('gold', '골드'),
        ('vintage', '빈티지')  
    ]
    
    code = models.CharField(max_length=30, choices=THEME_CHOICES, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    coin_cost = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.name} ({self.code})"
    
    class Meta:
        app_label = 'quests'