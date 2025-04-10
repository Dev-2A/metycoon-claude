import { useState } from 'react';
import { createQuest } from '../../api/quests';
import ThemedCard from '../common/ThemedCard';
import ThemedButton from '../common/ThemedButton';

export default function QuestForm({ onQuestCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    quest_type: 'daily',
    experience: 50,
    coin: 10,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createQuest(form);
    setForm({
      title: '',
      description: '',
      quest_type: 'daily',
      experience: 50,
      coin: 10,
    });
    if (onQuestCreated) onQuestCreated();
  };

  return (
    <ThemedCard as="form" onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-lg font-bold mb-2">📝 퀘스트 등록</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="제목"
        className="border p-2 w-full mb-2"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="설명"
        className="border p-2 w-full mb-2"
      />
      <select
        name="quest_type"
        value={form.quest_type}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="daily">일일</option>
        <option value="weekly">주간</option>
        <option value="monthly">월간</option>
        <option value="event">이벤트</option>
      </select>

      <div className="flex gap-2 mb-2">
        <input
          name="experience"
          type="number"
          value={form.experience}
          onChange={handleChange}
          className="border p-2 w-1/2"
          placeholder="경험치"
        />
        <input
          name="coin"
          type="number"
          value={form.coin}
          onChange={handleChange}
          className="border p-2 w-1/2"
          placeholder="코인"
        />
      </div>

      <ThemedButton type="submit">등록</ThemedButton>
    </ThemedCard>
  );
}