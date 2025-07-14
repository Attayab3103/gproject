import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { motion } from 'framer-motion';
import SurpriseBox from './SurpriseBox';
import MusicToggle from './MusicToggle';
import Footer from './Footer';
import HeartParticles from './HeartParticles';
import FloatingHearts from './FloatingHearts';
import LoveTypewriter from './LoveTypewriter';

const navLinks = [
  { to: '/our-story', label: '💖 Our Story' },
  { to: '/mahi-special', label: '🌟 Mahi, You Are Special' },
  { to: '/sorry-mahi', label: "😔 I'm Sorry Mahi" },
  { to: '/my-promise', label: '💍 My Promise' },
  { to: '/our-moments', label: '📸 Our Moments' },
  { to: '/special', label: '🎉 Special for Mahi' },
  { to: '/bouquet', label: '💐 Virtual Bouquet' },
  { to: '/game', label: '🎮 Word Game' }, // Add this line
];



import HeartCursor from './HeartCursor';
import AnimatedBackground from './AnimatedBackground';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-fuchsia-300 to-indigo-400 font-poppins relative">
      <AnimatedBackground />
      <HeartCursor />
      <FloatingHearts />
      <LoveTypewriter />
      <HeartParticles />
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-wrap items-center justify-between px-4 py-2 sm:py-4 bg-white/30 backdrop-blur-lg shadow-lg border-b border-white/40">
        <div className="flex items-center">
          {/* Logo or Title can go here */}
          <span className="text-xl font-bold text-fuchsia-800 hidden sm:block">My Love Story</span>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-fuchsia-700 hover:text-fuchsia-900 focus:outline-none focus:text-fuchsia-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } w-full flex-grow sm:flex sm:items-center sm:w-auto`}
        >
          <div className="text-sm sm:flex-grow sm:text-right sm:pr-4">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                className={({ isActive }) =>
                  `block mt-4 sm:inline-block sm:mt-0 px-2 xs:px-3 sm:px-4 py-1 xs:py-2 rounded-full font-semibold text-sm xs:text-base sm:text-lg transition-all duration-300 ${isActive ? 'bg-pink-500 text-white shadow-lg' : 'text-fuchsia-700 hover:bg-pink-100 hover:text-pink-600'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="pt-16 sm:pt-24 pb-8 flex flex-col items-center justify-center min-h-screen">
        {children}
      </main>
      {/* TODO: Add background music toggle, heart particles, and Lottie animations */}
      <SurpriseBox />
      <MusicToggle />
      <Footer />
    </div>
  );
};

export default Layout;
