import { createContext, useContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../api/auth";
import { getThemes } from "../api/themes";
import { getUserTitles } from "../api/titles";
import { getUserAchievements } from "../api/achievements";
import { getQuestHistoryHeatmap } from "../api/stats";

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
    const [user, setUser] = useState(null);
    const [themes, setThemes] = useState([]);
    const [titles, setTitles] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [heatmapData, setHeatmapData] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshProfile = () => setRefreshKey((prev) => prev + 1);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [userData, themesData, titlesData, achievementsData, heatmap] = await Promise.all([
                    fetchUserInfo(),
                    getThemes(),
                    getUserTitles(),
                    getUserAchievements(),
                    getQuestHistoryHeatmap(),
                ]);
                setUser(userData);
                setThemes(themesData);
                setTitles(titlesData);
                setAchievements(achievementsData);
                setHeatmapData(heatmap);
            } catch (error) {
                console.error("❌ 프로필 데이터 로드 실패:", error);
            }
        };

        fetchAll();
    }, [refreshKey]);

    const value = {
        user,
        themes,
        titles,
        achievements,
        heatmapData,
        refreshProfile,
    };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}