import { equipTitle, unequipTitle } from "../../api/titles";
import ThemedCard from "../common/ThemedCard";
import ThemedButton from "../common/ThemedButton";
import { useProfile } from "../../context/ProfileContext";

export default function UserTitles({ onChange }) {
  const { titles, refreshProfile } = useProfile();

  const handleEquip = async (id) => {
    await equipTitle(id);
    refreshProfile();
  };

  const handleUnequip = async (id) => {
    await unequipTitle(id);
    refreshProfile();
  };

  if (!titles.length) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">🧢 보유 칭호</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {titles.map((entry) => (
          <li key={entry.id}>
            <ThemedCard>
              <div className="font-bold text-lg">{entry.title.name}</div>
              <div className="text-sm text-gray-600 mb-2">{entry.title.description}</div>
              {entry.equipped ? (
                <ThemedButton variant="danger" onClick={() => handleUnequip(entry.id)}>
                  해제
                </ThemedButton>
              ) : (
                <ThemedButton onClick={() => handleEquip(entry.id)}>
                  착용
                </ThemedButton>
              )}
            </ThemedCard>
          </li>
        ))}
      </ul>
    </div>
  );
}