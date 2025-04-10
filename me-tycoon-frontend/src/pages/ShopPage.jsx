import RewardShop from "../components/rewards/RewardShop";
import ThemeShop from "../components/profile/ThemeShop";
import ThemedCard from "../components/common/ThemedCard";
import { useState } from "react";

export default function ShopPage() {
    const [shopRefreshKey, setShopRefreshKey] = useState(false);

    const handleShopUpdate = () => {
        setShopRefreshKey((prev) => !prev);
    };

    return (
        <div className="space-y-8">
            {/* 보상 상점 */}
            <ThemedCard>
                <h2 className="text-xl font-bold mb-4">🎁 보상 상점</h2>
                <RewardShop onBuy={handleShopUpdate} />
            </ThemedCard>

            {/* 테마 상점 */}
            <ThemedCard>
                <h2 className="text-xl font-bold mb-4">🎨 테마 상점</h2>
                <ThemeShop onBuyOrApply={handleShopUpdate} />
            </ThemedCard>
        </div>
    );
}