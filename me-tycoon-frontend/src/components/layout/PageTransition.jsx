import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
    const location = useLocation();
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        setTransitionStage("fadeOut");
        const timeout = setTimeout(() => {
            setTransitionStage("fadeIn");
        }, 200); // 페이지 이동 시 페이드 아웃 후 인

        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <div className={`transition-opacity duration-500 ${transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </div>
    );
}