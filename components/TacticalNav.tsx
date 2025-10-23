'use client';

import { useState, useEffect } from 'react';

export default function TacticalNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-tactical-surface/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/img/Screenshot 2025-06-20 at 20.44.53.png"
              alt="NERV Systems"
              className="h-12 w-auto"
            />
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-tactical-textDim hover:text-white transition-colors">
              Features
            </a>
            <a href="#platform" className="text-sm text-tactical-textDim hover:text-white transition-colors">
              Platform
            </a>
            <a href="#contact" className="text-sm text-tactical-textDim hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* CTA */}
          <button className="px-6 py-2 bg-white text-black hover:bg-tactical-textDim transition-all duration-300 text-sm font-medium">
            Request Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
