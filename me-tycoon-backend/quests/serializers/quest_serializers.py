from rest_framework import serializers
from quests.models import Quest, QuestCompletion

class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = '__all__'

class QuestCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestCompletion
        fields = '__all__'