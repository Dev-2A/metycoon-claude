from rest_framework import viewsets
from quests.models import UserStats
from quests.serializers.stats_serializers import UserStatsSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from quests.models import Quest, QuestCompletion, UserReward, UserAchievement
from django.contrib.auth import get_user_model

from django.utils.timezone import now
from datetime import timedelta, datetime
from collections import defaultdict
from django.db.models import Count, Sum
from django.db.models.functions import TruncDate

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class UserStatsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserStatsSerializer
    queryset = UserStats.objects.all()

    def get_queryset(self):
        user = User.objects.first()  # 로그인 전이므로 첫 번째 유저 고정
        return UserStats.objects.filter(user=user)

@api_view(['GET'])
def quest_completion_stats(request):
    user = User.objects.first()
    
    total = Quest.objects.count()
    completed = QuestCompletion.objects.filter(user=user).count()
    percent = (completed / total * 100) if total > 0 else 0
    
    return Response({
        'total_quests': total,
        'completed_quests': completed,
        'completion_percent': round(percent, 1),
    })

@api_view(['GET'])
def weekly_quest_history(request):
    user = User.objects.first()
    today = now().date()
    
    # 오늘부터 7일 전까지
    data = defaultdict(int)
    for i in range(7):
        day = today - timedelta(days=i)
        count = QuestCompletion.objects.filter(user=user, completed_at__date=day).count()
        data[str(day)] = count
    
    # 날짜 기준 정렬 (과거 -> 오늘 순)
    sorted_data = dict(sorted(data.items()))
    return Response(sorted_data)

@api_view(['GET'])
def monthly_stats(request):
    user = User.objects.first()
    today = now().date()

    # 기본 구조 생성
    stats_by_date = defaultdict(lambda: {'quests_completed': 0, 'exp_gained': 0, 'coin_gained': 0})

    # 최근 30일 퀘스트 완료 기록 가져오기
    completions = QuestCompletion.objects.filter(
        user=user,
        completed_at__date__gte=today - timedelta(days=29)
    )

    for entry in completions:
        day = entry.completed_at.date().isoformat()
        stats_by_date[day]['quests_completed'] += 1
        stats_by_date[day]['exp_gained'] += entry.quest.experience
        stats_by_date[day]['coin_gained'] += entry.quest.coin

    # 날짜 기준 정렬 후 반환
    sorted_data = []
    for i in range(30):
        day = today - timedelta(days=29 - i)
        day_str = day.isoformat()
        daily = stats_by_date[day_str]
        sorted_data.append({
            'date': day_str,
            'quests_completed': daily['quests_completed'],
            'exp_gained': daily['exp_gained'],
            'coin_gained': daily['coin_gained'],
        })

    return Response(sorted_data)

@api_view(['GET'])
def quest_type_stats(request):
    user = User.objects.first()
    
    # quest_type 기준으로 카운트
    type_counts = QuestCompletion.objects.filter(user=user) \
        .values('quest__quest_type') \
        .annotate(count=Count('id'))
    
    # 예시: [{'quest__quest_type': 'daily', 'count': 5}, ...] → 변환
    result = {
        'daily': 0,
        'weekly': 0,
        'monthly': 0,
        'event': 0,
    }
    for item in type_counts:
        key = item['quest__quest_type']
        result[key] = item['count']
    
    return Response(result)

@api_view(['GET'])
def top_quests(request):
    user = User.objects.first()
    
    # 퀘스트별 완료 횟수 집계
    top = QuestCompletion.objects.filter(user=user) \
        .values('quest__title') \
        .annotate(count=Count('id')) \
        .order_by('-count')[:3]
    
    results = [
        {'title': item['quest__title'], 'count': item['count']}
        for item in top
    ]
    return Response(results)

@api_view(['GET'])
def best_exp_day(request):
    user = User.objects.first()
    
    # 날짜별 경험치 합계 구하기
    grouped = QuestCompletion.objects.filter(user=user) \
        .annotate(day=TruncDate('completed_at')) \
        .values('day') \
        .annotate(total_exp=Sum('quest__experience')) \
        .order_by('-total_exp')
    
    if grouped:
        best = grouped[0]
        return Response({
            'date': best['day'],
            'exp': best['total_exp']
        })
    else:
        return Response({
            'date': None,
            'exp': 0
        })

@api_view(['GET'])
def best_coin_spent_day(request):
    user = User.objects.first()
    
    # 날짜별 코인 사용량 합산
    grouped = UserReward.objects.filter(user=user) \
        .annotate(day=TruncDate('acquired_at')) \
        .values('day') \
        .annotate(total_coin=Sum('reward__cost')) \
        .order_by('-total_coin')
    
    if grouped:
        best = grouped[0]
        return Response({
            'date': best['day'],
            'coin': best['total_coin']
        })
    else:
        return Response({
            'date': None,
            'coin': 0
        })

@api_view(['GET'])
def summary_stats(request):
    user = User.objects.first()
    
    total_quests = QuestCompletion.objects.filter(user=user).count()
    total_exp = QuestCompletion.objects.filter(user=user).aggregate(total=Sum('quest__experience'))['total'] or 0
    total_coin_spent = UserReward.objects.filter(user=user).aggregate(total=Sum('reward__cost'))['total'] or 0
    total_achievements = UserAchievement.objects.filter(user=user).count()
    
    return Response({
        'total_quests': total_quests,
        'total_exp': total_exp,
        'total_coin_spent': total_coin_spent,
        'total_achievements': total_achievements
    })

class QuestHeatmapView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        today = datetime.today().date()
        start_date = today - timedelta(days=365)
        
        quest_data = (
            QuestCompletion.objects.filter(user=user, completed_at__date__gte=start_date)
            .values('completed_at__date')
            .annotate(count=Count('id'))
            .order_by('completed_at__date')
        )
        
        data = [
            {
                'date': entry['completed_at__date'].isoformat(),
                'count': entry['count']
            }
            for entry in quest_data
        ]
        
        return Response(data)