from rest_framework import serializers
from quests.models import Reward, UserReward

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'

class UserRewardSerializer(serializers.ModelSerializer):
    reward = RewardSerializer()  # 보상 정보 포함해서 보여주기

    class Meta:
        model = UserReward
        fields = '__all__'