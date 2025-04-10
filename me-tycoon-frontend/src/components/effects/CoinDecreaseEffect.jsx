import { useEffect, useState } from "react";

export default function CoinDecreaseEffect({ amount, onComplete }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-10 right-10 bg-yellow-300 text-yellow-800 px-4 py-2 rounded shadow-lg animate-bounce text-sm z-50">
            💰 코인 -{amount}
        </div>
    );
}