import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface VideoOption {
  label: string;
  url: string;
}

const VIDEOS: VideoOption[] = [
  {
    label: 'Golden Hour',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4'
  },
  {
    label: 'Still Water',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4'
  },
  {
    label: 'Deep Woods',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4'
  },
  {
    label: 'Quiet Dawn',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4'
  }
];

export default function App() {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  // Deep woods dark text mode (index 2)
  const isDeepWoods = activeVideo === 2;

  const handleVideoSwitch = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const navLinks = ['How It Works', 'Features', 'Pricing', 'Community'];
  const stats = [
    '60+ Deep Sessions',
    '12,000+ Creators',
    '4.8 User Satisfaction',
    'Intentional-First Design'
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col font-serif select-none">
      
      {/* 1. Background Video Layer (Stack of 4 absolute videos) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {VIDEOS.map((video, idx) => (
          <video
            key={video.label}
            src={video.url}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* 2. Transparent PNG Overlay with continuous Train-Bob Animation (z-index 1) */}
      <img
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
        alt="Atmospheric Overlay"
        className="train-bob-overlay"
      />

      {/* 3. Content Layer (z-index 2) */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 py-6 sm:px-12 sm:py-8 max-w-7xl mx-auto pointer-events-auto">
        
        {/* Navigation */}
        <header className="w-full flex items-center justify-between">
          {/* Logo (Instrument Serif, italic, white) */}
          <div className="text-white italic text-2xl sm:text-3xl tracking-wide cursor-pointer">
            Lumora
          </div>

          {/* Desktop Nav Pill (md+) */}
          <nav className="hidden md:flex items-center gap-6 liquid-glass px-6 py-2 rounded-full font-sans">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-white/90 hover:text-white text-sm transition-colors duration-200"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                const app = document.getElementById('app-container');
                const hero = document.getElementById('hero-landing-page');
                if (app && hero) {
                  hero.classList.add('hidden');
                  app.classList.remove('hidden');
                }
              }}
              className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded-full hover:bg-white/90 transition-transform active:scale-95 shadow-sm"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="liquid-glass w-11 h-11 rounded-full flex items-center justify-center text-white relative z-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Menu
                  className={`w-6 h-6 absolute transition-all duration-300 transform ${
                    mobileMenuOpen
                      ? 'rotate-90 scale-75 opacity-0 pointer-events-none'
                      : 'rotate-0 scale-100 opacity-100'
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute transition-all duration-300 transform ${
                    mobileMenuOpen
                      ? 'rotate-0 scale-100 opacity-100'
                      : '-rotate-90 scale-75 opacity-0 pointer-events-none'
                  }`}
                />
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 transition-opacity duration-500 font-sans">
            <div className="flex flex-col items-center gap-8 w-full max-w-sm text-center">
              {navLinks.map((link, i) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-3xl font-light tracking-wide transform translate-y-0 transition-all duration-500 hover:text-amber-200"
                  style={{
                    animationDelay: `${100 + i * 50}ms`,
                    animationDuration: '500ms',
                    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {link}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const app = document.getElementById('app-container');
                  const hero = document.getElementById('hero-landing-page');
                  if (app && hero) {
                    hero.classList.add('hidden');
                    app.classList.remove('hidden');
                  }
                }}
                className="w-full bg-white text-black font-semibold text-lg py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* Hero Content (Centered) */}
        <main className="flex flex-col items-center text-center my-auto px-4 max-w-4xl mx-auto w-full">
          
          {/* Badge */}
          <div
            className={`liquid-glass rounded-full px-5 py-1.5 mb-6 text-xs sm:text-sm font-sans tracking-wide transition-colors duration-700 ${
              isDeepWoods ? 'text-[#182C41]' : 'text-white/90'
            }`}
          >
            Over 10,000 minds already finding their clarity
          </div>

          {/* Heading (Instrument Serif) */}
          <h1
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-normal transition-colors duration-700 tracking-tight ${
              isDeepWoods ? 'text-[#182C41]' : 'text-white'
            }`}
          >
            Clarity in an Endlessly<br />Noisy Universe
          </h1>

          {/* Subtext (System UI) */}
          <p
            className={`mt-6 text-sm sm:text-base md:text-lg font-sans max-w-xl leading-relaxed transition-colors duration-700 ${
              isDeepWoods ? 'text-[#182C41]/80' : 'text-white/80'
            }`}
          >
            Rise above the chaos of pings, infinite scrolling, and relentless demands.
            Discover how to protect your presence and create with intention.
          </p>

          {/* Email Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Welcome to Lumora! Access granted for: ${email}`);
            }}
            className="mt-8 w-full max-w-[320px] sm:max-w-md liquid-glass p-1.5 rounded-full flex items-center gap-2 font-sans transition-all duration-700"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Best Email"
              required
              className={`flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder-white/50 transition-colors duration-700 ${
                isDeepWoods ? 'text-[#182C41] placeholder-[#182C41]/50' : 'text-white'
              }`}
            />
            <button
              type="submit"
              className="bg-white text-black text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow"
            >
              Get Early Access
            </button>
          </form>

          {/* Video Switcher Bar */}
          <div className="flex items-center gap-2 sm:gap-4 mt-8 font-sans">
            {VIDEOS.map((vid, idx) => (
              <button
                key={vid.label}
                onClick={() => handleVideoSwitch(idx)}
                disabled={isTransitioning}
                className={`text-xs sm:text-sm px-3 py-1.5 border-b-2 transition-all duration-300 ${
                  activeVideo === idx
                    ? isDeepWoods
                      ? 'text-[#182C41] border-[#182C41] font-semibold opacity-100'
                      : 'text-white border-white font-semibold opacity-100'
                    : isDeepWoods
                    ? 'text-[#182C41]/50 border-transparent hover:text-[#182C41]/80'
                    : 'text-white/50 border-transparent hover:text-white/80'
                }`}
              >
                {vid.label}
              </button>
            ))}
          </div>
        </main>

        {/* Bottom Stats (Push to bottom via spacer) */}
        <footer className="w-full flex justify-center items-center py-2 font-sans text-xs sm:text-sm text-white/70">
          <div className="hidden sm:flex items-center gap-4 flex-wrap justify-center">
            {stats.map((stat, i) => (
              <React.Fragment key={stat}>
                <span>{stat}</span>
                {i < stats.length - 1 && <span className="opacity-40">|</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="sm:hidden text-center text-xs opacity-80">
            60+ Sessions &bull; 12k+ Creators &bull; 4.8 Rating
          </div>
        </footer>

      </div>
    </section>
  );
}
