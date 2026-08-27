import React, { useState, useEffect, useRef } from 'react';

// Custom Typewriter Hook
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let index = 0;

    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          setDone(true);
          clearInterval(timer);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const prevXRef = useRef<number | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const typewriterText =
    "One Family. One Memory. One Intelligent Living Digital Twin. Preserving verified memories, securing sensitive documents, and proactively safeguarding what matters most.";
  const { displayed, done } = useTypewriter(typewriterText, 28, 500);

  // Show action pills 400ms after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Horizontal mouse-scrub video logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const SENSITIVITY = 0.8;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.04) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }
      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video.duration || isNaN(video.duration)) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.max(
        0,
        Math.min(video.duration, (targetTimeRef.current || video.currentTime) + timeOffset)
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('support@familytwin.io');
    setToastMessage('Copied support@familytwin.io to clipboard!');
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const navLinks = ['Knowledge Vault', 'Living Legacy', 'Emergency AI', '7 Agents'];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-body select-none">
      
      {/* Background Video (Mouse-Scrub Controlled) */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
        className="fixed inset-0 w-full h-full object-cover object-[70%_center] pointer-events-none z-0"
      />

      {/* Navbar (fixed, z-index: 10) */}
      <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5">
        {/* Logo (left) */}
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="font-heading text-[21px] sm:text-[26px] tracking-tight text-white font-medium">
            Family Vault&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-white tracking-[-0.02em] select-none leading-none">
            &#10035;
          </span>
        </div>

        {/* Desktop Nav Links (center, hidden below md) */}
        <nav className="hidden md:flex items-center text-[20px] text-white">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link}>
              <a
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:opacity-60 transition-opacity duration-200"
              >
                {link}
              </a>
              {idx < navLinks.length - 1 && <span className="mr-1.5">, </span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="text-[20px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity duration-200"
          >
            Concierge AI
          </a>
        </div>

        {/* Mobile Hamburger (visible below md) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden flex-col justify-center gap-[5px] w-6 h-6 z-20 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-[30px] font-medium text-white hover:opacity-60"
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[30px] font-medium text-white underline underline-offset-4 hover:opacity-60"
        >
          Concierge AI
        </a>
      </div>

      {/* Hero Section (z-index: 1) */}
      <main className="relative z-[1] flex flex-col justify-end pb-12 md:justify-center md:pb-0 h-screen px-5 sm:px-8 md:px-10 overflow-hidden">
        <div className="max-w-2xl">
          
          {/* Big Title: FAMILY VAULT */}
          <div className="mb-4">
            <h1 className="font-heading text-5xl sm:text-7xl font-bold tracking-tight text-white uppercase leading-none drop-shadow-2xl">
              FAMILY VAULT
            </h1>
            <p className="text-white/90 text-sm sm:text-base mt-2 tracking-tight">
              One Family. One Memory. One Intelligent Living Digital Twin.
            </p>
          </div>

          {/* 1. Blurred Intro Label */}
          <div className="pointer-events-none select-none mb-3 text-[clamp(14px,2.5vw,18px)] leading-[1.35] font-normal text-white blur-[3px]">
            🌟 Neuralyn &times; Living Digital Twin AI<br />
            Privacy-First Multi-Agent Family Intelligence (7 Specialized Agents)
          </div>

          {/* 2. Typewriter Text */}
          <p className="text-white mb-5 sm:mb-6 text-[clamp(15px,3vw,20px)] leading-[1.4] font-normal min-h-[54px]">
            {displayed}
            {!done && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-pulse" />
            )}
          </p>

          {/* 3. Action Pill Buttons */}
          <div
            className={`flex flex-wrap gap-y-1 transition-all duration-400 ${
              pillsVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            {[
              '📂 Knowledge Vault & Passports',
              '⏳ Living Legacy Archive',
              '🚨 Medical Emergency Center',
              '🤖 7 Multi-Agent System',
              '🛡️ Privacy & Access Matrix'
            ].map((label) => (
              <button
                key={label}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 sm:px-4.5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200"
              >
                {label}
              </button>
            ))}

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[14px] px-4 sm:px-4.5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
            >
              <span>
                Reach us: <span className="underline underline-offset-1">support@familytwin.io</span>
              </span>
              <svg
                className="w-3 h-3 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>

        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-2xl z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}

    </div>
  );
}
