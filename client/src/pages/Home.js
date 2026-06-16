import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🎯',
    title: 'Built for you',
    desc: 'Like a video and save it to your feed. VidVerve learns what you love and keeps showing you more of it.',
  },
  {
    icon: '⚡',
    title: 'Instant discovery',
    desc: 'Search anything. Get YouTube results in seconds, without the noise of an algorithm you never asked for.',
  },
  {
    icon: '📂',
    title: 'Browse by mood',
    desc: 'Dive into Technology, Fitness, Travel, or Entertainment — hand-curated categories, one click away.',
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-brand-bg font-body overflow-x-hidden">

      {/* Hero */}
      <div className="relative px-6 pt-24 pb-20 text-center">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(240,165,0,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 text-brand-accent font-ui font-semibold text-xs tracking-[0.18em] uppercase mb-6 px-3 py-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
            Your video feed, your way
          </p>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-brand-text leading-tight mb-6">
            Discover what
            <span
              className="block italic text-brand-accent"
              style={{ textShadow: '0 0 60px rgba(240,165,0,0.25)' }}
            >
              moves you
            </span>
          </h1>

          <p className="text-brand-muted text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Stop scrolling endlessly. Build a feed that's curated by you, for you — powered by YouTube, owned by your taste.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/signup"
              className="font-ui font-bold text-sm tracking-wide px-8 py-3.5 rounded-xl bg-brand-accent text-brand-bg hover:bg-amber-400 transition-all duration-200 shadow-amber-sm hover:shadow-amber-md w-full sm:w-auto"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              className="font-ui font-semibold text-sm tracking-wide px-8 py-3.5 rounded-xl border border-brand-border text-brand-muted hover:border-brand-faint hover:text-brand-text transition-all duration-200 w-full sm:w-auto"
            >
              I have an account
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="bg-brand-card rounded-2xl p-6 border border-brand-border hover:border-brand-accent/20 transition-all duration-300 group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-ui font-bold text-brand-text text-base mb-2 group-hover:text-brand-accent transition-colors duration-200">
              {f.title}
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
