import React from 'react';
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
];



import HeartCursor from './HeartCursor';
import AnimatedBackground from './AnimatedBackground';

const Layout = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-fuchsia-300 to-indigo-400 font-poppins relative">
    <AnimatedBackground />
    <HeartCursor />
    <FloatingHearts />
    <LoveTypewriter />
    <HeartParticles />
    <nav className="fixed top-0 left-0 w-full z-50 flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 py-2 sm:py-4 bg-white/30 backdrop-blur-lg shadow-lg border-b border-white/40">
      {navLinks.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `px-2 xs:px-3 sm:px-4 py-1 xs:py-2 rounded-full font-semibold text-sm xs:text-base sm:text-lg transition-all duration-300 ${isActive ? 'bg-pink-500 text-white shadow-lg' : 'text-fuchsia-700 hover:bg-pink-100 hover:text-pink-600'}`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
    <main className="pt-24 pb-8 flex flex-col items-center justify-center min-h-screen">
      {children}
    </main>
    {/* TODO: Add background music toggle, heart particles, and Lottie animations */}
    <SurpriseBox />
    <MusicToggle />
    <Footer />
  </div>
);

export default Layout;
