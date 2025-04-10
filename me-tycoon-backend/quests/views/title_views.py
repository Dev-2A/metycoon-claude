from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from quests.models import UserTitle, Title
from quests.serializers.title_serializers import UserTitleSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserTitleViewSet(viewsets.ModelViewSet):
    serializer_class = UserTitleSerializer
    queryset = UserTitle.objects.all()
    
    def get_queryset(self):
        user = User.objects.first() # 로그인 전 고정
        return UserTitle.objects.filter(user=user)
    
    @action(detail=True, methods=['post'])
    def equip(self, request, pk=None):
        user = User.objects.first()
        try:
            selected = UserTitle.objects.get(id=pk, user=user)
        except UserTitle.DoesNotExist:
            return Response({'error': '칭호를 찾을 수 없습니다.'}, status=404)
        
        # 착용 중인 칭호 전부 해제
        UserTitle.objects.filter(user=user, equipped=True).update(equipped=False)
        
        # 선택한 칭호 착용
        selected.equipped = True
        selected.save()
        return Response({'message': f'{selected.title.name} 칭호 착용 완료!'})
    
    @action(detail=True, methods=['post'])
    def unequip(self, request, pk=None):
        user = User.objects.first()
        try:
            title = UserTitle.objects.get(id=pk, user=user)
        except UserTitle.DoesNotExist:
            return Response({'error': '칭호를 찾을 수 없습니다.'}, status=404)
        
        title.equipped = False
        title.save()
        return Response({'message': f'{title.title.name} 칭호 해제 완료!'})