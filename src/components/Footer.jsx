import React from 'react';
import { motion } from 'framer-motion';

const loveQuotes = [
  'You are the reason my heart beats. 💓',
  'Every moment with you is a treasure. 🥰',
  'Together, we are infinite. ♾️',
  'You are my sunshine on a cloudy day. ☀️',
  'With you, forever isn’t long enough. 💖',
  'You are my dream come true. ✨',
  'I love you more than words can say. 💌',
];

const animatedEmojis = [
  '💖', '🌟', '💍', '💌', '💓', '🥰', '✨', '☀️', '🌈', '🎶', '🦋', '🌸', '🫶', '💫', '🎉', '❤️', '💕', '💗', '💝', '💞', '💟', '👩‍❤️‍👨', '👩‍❤️‍💋‍👨', '💃', '🕺', '🎂', '🍫', '🍰', '🍦', '🍭', '🌹'
];

function getRandomQuote() {
  return loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
}

const Footer = () => {
  const [quote, setQuote] = React.useState(getRandomQuote());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full py-4 px-2 flex flex-col items-center justify-center bg-white/40 backdrop-blur-lg border-t border-pink-200 mt-8 z-50 relative overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-base xs:text-lg md:text-2xl font-playfair text-pink-600 text-center max-w-2xl leading-snug"
      >
        “In the vast universe of love, my heart found its home in you, Mahi. Forever yours, <span className='font-bold'>Attayab</span>.”
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 2 }}
        className="flex gap-2 mt-3"
      >
        <motion.span
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="text-xl xs:text-2xl md:text-3xl"
          role="img"
          aria-label="heart"
        >
          💖
        </motion.span>
        <motion.span
          whileHover={{ scale: 1.2, rotate: -10 }}
          className="text-xl xs:text-2xl md:text-3xl"
          role="img"
          aria-label="star"
        >
          🌟
        </motion.span>
        <motion.span
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="text-xl xs:text-2xl md:text-3xl"
          role="img"
          aria-label="infinity"
        >
          ♾️
        </motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="text-xs xs:text-sm text-pink-400 mt-2 text-center"
      >
        &copy; {new Date().getFullYear()} Attayab & Mahi. All Rights Reserved.
      </motion.div>
      <motion.div
        key={quote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className="relative mt-3 bg-pink-100/90 px-3 py-1.5 rounded-full shadow-lg text-pink-700 font-semibold text-xs xs:text-sm md:text-base pointer-events-none text-center max-w-xs w-full mx-auto"
        style={{ zIndex: 60 }}
      >
        {quote}
      </motion.div>
      {/* Animated floating hearts in the footer background */}
      {[...Array(12)].map((_, i) => {
        const emoji = animatedEmojis[Math.floor(Math.random() * animatedEmojis.length)];
        const size = `${1.2 + Math.random() * 2.2}rem`;
        const left = `${Math.random() * 90 + 5}%`;
        const delay = Math.random() * 6;
        const duration = 7 + Math.random() * 5;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              y: [40, -30 - Math.random() * 40, -60 - Math.random() * 60],
              x: [left, left, left],
              rotate: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
            className="absolute select-none pointer-events-none drop-shadow-lg"
            style={{ left, bottom: 0, zIndex: 1, fontSize: size }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </footer>
  );
};

export default Footer;
