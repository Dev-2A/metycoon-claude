import React from 'react';
import { User, ClipboardList, ShoppingBag, Award, Crown, BarChart2 } from 'lucide-react';

const BottomNavigation = ({ currentView, onNavigate }) => {
  return (
    <nav className="bg-gray-800 p-3 shadow-lg">
      <div className="container mx-auto flex justify-around">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`p-2 rounded-full ${currentView === 'dashboard' ? 'bg-blue-700' : ''}`}
        >
          <User size={24} />
        </button>
        <button
          onClick={() => onNavigate('quests')}
          className={`p-2 rounded-full ${currentView === 'quests' ? 'bg-blue-700' : ''}`}
        >
          <ClipboardList size={24} />
        </button>
        <button
          onClick={() => onNavigate('rewards')}
          className={`p-2 rounded-full ${currentView === 'rewards' ? 'bg-blue-700' : ''}`}
        >
          <ShoppingBag size={24} />
        </button>
        <button
          onClick={() => onNavigate('achievements')}
          className={`p-2 rounded-full ${currentView === 'achievements' ? 'bg-blue-700' : ''}`}
        >
          <Award size={24} />
        </button>
        <button
          onClick={() => onNavigate('titles')}
          className={`p-2 rounded-full ${currentView === 'titles' ? 'bg-blue-700' : ''}`}
        >
          <Crown size={24} />
        </button>
        <button
          onClick={() => onNavigate('stats')}
          className={`p-2 rounded-full ${currentView === 'stats' ? 'bg-blue-700' : ''}`}
        >
          <BarChart2 size={24} />
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;