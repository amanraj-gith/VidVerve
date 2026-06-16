import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '🎯', title: 'Personalized Feed', desc: 'Save videos you like and get more of what matters to you.' },
  { icon: '🔍', title: 'Smart Search', desc: 'Find any topic instantly with YouTube-powered search.' },
  { icon: '📂', title: 'Browse by Category', desc: 'Explore Technology, Fitness, Travel, Entertainment and more.' },
];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Your personal<br />
          <span className="text-blue-600">YouTube feed</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Discover videos that match your interests. Save, explore, and build a feed that's entirely yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            Get started free
          </Link>
          <Link
            to="/login"
            className="border-2 border-gray-300 text-gray-700 text-lg font-semibold px-8 py-3 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map(f => (
          <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
