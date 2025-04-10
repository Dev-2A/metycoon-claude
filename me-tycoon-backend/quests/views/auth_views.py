from rest_framework import generics, status
from quests.serializers.auth_serializers import RegisterSerializer, ChangePasswordSerializer
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        "username": user.username,
        "applied_theme_id": user.applied_theme_id,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'message': '비밀번호가 성공적으로 변경되었습니다.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    email = request.data.get('email')
    
    if email is not None:
        user.email = email
        user.save()
        return Response({"message": "프로필이 업데이트되었습니다."})
    else:
        return Response(
            {"error": "이메일이 필요합니다"},
            status=status.HTTP_400_BAD_REQUEST
        )