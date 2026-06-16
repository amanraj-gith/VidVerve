import React from 'react';
import { useNavigate } from 'react-router-dom';

const TAGS = [
  { name: 'Technology',    emoji: '💻', color: 'hover:border-blue-500/50 hover:text-blue-400' },
  { name: 'Fitness',       emoji: '🏋️', color: 'hover:border-green-500/50 hover:text-green-400' },
  { name: 'Travel',        emoji: '✈️', color: 'hover:border-orange-500/50 hover:text-orange-400' },
  { name: 'Entertainment', emoji: '🎬', color: 'hover:border-purple-500/50 hover:text-purple-400' },
];

const InterestTag = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map(tag => (
        <button
          key={tag.name}
          onClick={() => navigate(`/categories/${tag.name}`)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border bg-brand-card text-brand-muted text-xs font-ui font-semibold transition-all duration-200 ${tag.color} hover:bg-brand-surface hover:-translate-y-px`}
        >
          <span>{tag.emoji}</span>
          <span>{tag.name}</span>
        </button>
      ))}
    </div>
  );
};

export default InterestTag;
