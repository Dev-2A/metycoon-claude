// 경험치 레벨 계산 함수
export const calculateExpProgress = (stats) => {
    if (!stats) return 0;

    const currentLevel = stats.level;
    const nextLevelExp = ((currentLevel * (currentLevel + 1)) / 2) * 100;
    const prevLevelExp = (((currentLevel - 1) * currentLevel) / 2) * 100;
    const currentLevelExp = stats.experience - prevLevelExp;
    const expNeeded = nextLevelExp - prevLevelExp;

    return (currentLevelExp / expNeeded) * 100;
};

// 퀘스트 완료 여부 확인 함수
export const isQuestCompleted = (quest, completions) => {
    if (!quest || !completions) return false;

    const today = new Date().toISOString().split('T')[0];

    // 일일 퀘스트는 오늘 날짜로 완료한 것만 ㄴ체크
    if (quest.quest_type === 'daily') {
        return completions.some(c =>
            c.quest === quest.id && c.completed_at.startsWith(today)
        );
    }

    // 주간 퀘스트는 이번 주에 완료한 것 체크
    if (quest.quest_type === 'weekly') {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0: 일요일, 1: 월요일 ...
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - dayOfWeek);
        weekStart.setHours(0, 0, 0, 0);

        return completions.some(c => {
            const completionDate = new Date(c.completed_at);
            return c.quest === quest.id && completionDate >= weekStart;
        });
    }

    // 월간 퀘스트는 이번 달에 완료한 것 체크
    if (quest.quest_type === 'monthly') {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        return completions.some(c => {
            const completionDate = new Date(c.completed_at);
            return c.quest === quest.id && completionDate >= monthStart;
        });
    }

    // 이벤트 퀘스트는 1번이라도 완료했으면 체크
    return completions.some(c => c.quest === quest.id);
};

// 날짜 포맷 함수
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};