import { resetUserState } from '../../api/user';
import ThemedButton from '../common/ThemedButton';

export default function ResetButton({ onReset }) {
  const handleClick = async () => {
    const confirmReset = window.confirm('정말 모든 상태를 초기화할까요?');
    if (confirmReset) {
      await resetUserState();
      alert('초기화 완료!');
      if (onReset) onReset();
    }
  };

  return (
    <div className="mb-6">
      <ThemedButton onClick={handleClick} variant="danger">
        🔄 상태 초기화
      </ThemedButton>
    </div>
  );
}