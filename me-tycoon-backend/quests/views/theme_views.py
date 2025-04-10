from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from quests.models import Theme
from quests.serializers.theme_serializers import ThemeSerializer


class ThemeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    
    def get_permissions(self):
        if self.action == 'buy':
            return [IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def buy(self, request, pk=None):
        theme = self.get_object()
        user = request.user
        if theme in user.themes.all():
            return Response({'detail': '이미 보유한 테마입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if user.userstats.coin < theme.coin_cost:
            return Response({'detail': '코인이 부족합니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.userstats.coin -= theme.coin_cost
        user.userstats.save()
        user.themes.add(theme)
        
        user.refresh_from_db()
        
        return Response({'detail': '테마를 성공적으로 구매했습니다.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def apply(self, request, pk=None):
        theme = self.get_object()
        user = request.user
        
        if theme not in user.themes.all():
            return Response({'detail': '보유하지 않은 테마입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.applied_theme = theme
        user.save()
        
        return Response({'detail': '테마가 적용되었습니다.'}, status=status.HTTP_200_OK)