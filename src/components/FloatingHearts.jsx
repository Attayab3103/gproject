import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

const loveNotes = [
  'You are my everything 💖',
  'Physics is beautiful, but you are magic ✨',
  'Forever yours, Attayab 💍',
  'Mahi, you light up my world 🌟',
  'I love you more every day 💗',
  'You are my universe 🌌',
  'My heart beats for you 💓',
  'With you, every moment is special 🥰',
];

const getRandom = (min, max) => Math.random() * (max - min) + min;

const FloatingHearts = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Clean up on unmount
    return () => {};
  }, []);

  return null;
};

export default FloatingHearts;
