from django.contrib import admin
from quests.models import Quest, QuestCompletion, UserStats, Reward, UserReward, Achievement, UserAchievement, Title, UserTitle, Theme

admin.site.register(Quest)
admin.site.register(QuestCompletion)
admin.site.register(UserStats)
admin.site.register(Reward)
admin.site.register(UserReward)
admin.site.register(Achievement)
admin.site.register(UserAchievement)
admin.site.register(Title)
admin.site.register(UserTitle)

@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'coin_cost']
    search_fields = ['name', 'code']