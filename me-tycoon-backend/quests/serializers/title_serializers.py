from rest_framework import serializers
from quests.models import Title, UserTitle


class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = '__all__'


class UserTitleSerializer(serializers.ModelSerializer):
    title = TitleSerializer()
    
    class Meta:
        model = UserTitle
        fields = '__all__'