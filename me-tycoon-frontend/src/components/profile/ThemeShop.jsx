import { useState, useEffect } from "react";
import { getThemes, buyTheme, applyTheme as applyThemeAPI } from "../../api/themes";
import { useTheme } from "../../context/ThemeContext";
import ThemedCard from "../common/ThemedCard";
import ThemedButton from "../common/ThemedButton";
import CoinDecreaseEffect from "../effects/CoinDecreaseEffect";

export default function ThemeShop({ onBuyOrApply }) {
  const [themes, setThemes] = useState([]);
  const [coinDecrease, setCoinDecrease] = useState(null);
  const { applyTheme } = useTheme();

  const fetchThemes = async () => {
    const data = await getThemes();
    setThemes(data);
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleBuy = async (id, cost) => {
    const success = await buyTheme(id);
    if (success) {
      setCoinDecrease(cost);
      onBuyOrApply?.();
      fetchThemes();
    }
  };

  const handleApply = async (id, themeCode) => {
    const success = await applyThemeAPI(id);
    if (success) {
      applyTheme(themeCode);
      alert('🎨 테마를 적용했습니다!');
      fetchThemes();
      onBuyOrApply?.();
    }
  };

  return (
    <div className="mb-8 relative">
      {coinDecrease && (
        <CoinDecreaseEffect amount={coinDecrease} onComplete={() => setCoinDecrease(null)} />
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <ThemedCard key={theme.id}>
            <div className="font-bold text-lg">{theme.name}</div>
            <p className="text-sm text-gray-600">{theme.description}</p>
            <p className="text-sm text-gray-500 mt-1">💰 {theme.coin_cost} 코인</p>
            {theme.is_applied ? (
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                적용됨
              </span>
            ) : theme.is_owned ? (
              <ThemedButton className="mt-2" onClick={() => handleApply(theme.id, theme.code)}>
                적용하기
              </ThemedButton>
            ) : (
              <ThemedButton className="mt-2" onClick={() => handleBuy(theme.id, theme.coin_cost)}>
                구매하기
              </ThemedButton>
            )}
          </ThemedCard>
        ))}
      </ul>
    </div>
  );
}