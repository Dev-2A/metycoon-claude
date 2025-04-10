import { useEffect, useState } from "react";

export default function AchievementUnlockEffect({ achievement, onComplete }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-20 right-10 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded shadow-lg animate-fadeInOut text-sm z-50">
            🏆 새 업적 해금: <strong>{achievement}</strong>
        </div>
    );
}