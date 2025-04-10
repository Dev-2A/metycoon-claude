from rest_framework import serializers
from quests.models import UserStats

class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = '__all__'