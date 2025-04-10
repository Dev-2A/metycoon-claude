import { useEffect, useState } from "react";

export default function LevelUpEffect({ level, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500); // 사라지는 애니메이션 이후 제거
        }, 2500); // 표시 시간

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-yellow-400 text-white text-3xl font-bold px-8 py-4 rounded shadow-xl animate-pop-up">
            🎉 레벨 업! Lv.{level} 🎉
            </div>
        </div>
    );
}