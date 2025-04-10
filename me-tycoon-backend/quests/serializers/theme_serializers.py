from rest_framework import serializers
from quests.models.theme_models import Theme
from quests.models.user_models import UserStats
from django.contrib.auth.models import User


class ThemeSerializer(serializers.ModelSerializer):
    is_owned = serializers.SerializerMethodField()
    is_applied = serializers.SerializerMethodField()
    bg_class = serializers.SerializerMethodField()
    
    class Meta:
        model = Theme
        fields = ['id', 'code', 'name', 'description', 'coin_cost', 'is_owned', 'is_applied', 'bg_class']
    
    def get_is_owned(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return False
        return user.themes.filter(id=obj.id).exists()
    
    def get_is_applied(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return user.applied_theme_id == obj.id
        return False
    
    def get_bg_class(self, obj):
        return f"theme-{obj.name.lower()}"