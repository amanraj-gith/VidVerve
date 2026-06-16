import React from 'react';
import { useNavigate } from 'react-router-dom';

const TAGS = [
  { name: 'Technology', emoji: '💻', bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700' },
  { name: 'Fitness',    emoji: '🏋️', bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700' },
  { name: 'Travel',     emoji: '✈️', bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700' },
  { name: 'Entertainment', emoji: '🎬', bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700' },
];

const InterestTag = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map(tag => (
        <button
          key={tag.name}
          onClick={() => navigate(`/categories/${tag.name}`)}
          className={`flex flex-col items-center w-16 sm:w-20 p-2 rounded-xl border-2 ${tag.bg} ${tag.border} hover:scale-105 transition-transform`}
        >
          <span className="text-2xl sm:text-3xl mb-1">{tag.emoji}</span>
          <span className={`text-xs font-semibold ${tag.text} leading-tight text-center`}>{tag.name}</span>
        </button>
      ))}
    </div>
  );
};

export default InterestTag;
