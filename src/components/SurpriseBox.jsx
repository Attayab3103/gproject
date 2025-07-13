import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Lottie from 'lottie-react';
// import confettiAnimation from '../assets/confetti.json';

const surpriseMessages = [
  "Mahi, you are the light of my life!",
  "Every moment with you is a blessing.",
  "I can't wait to make more memories with you.",
  "You are my forever and always.",
  "Physics may explain the universe, but you are my universe!"
];

const SurpriseBox = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
    setMessage(surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <button
        className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-6 py-3 rounded-2xl shadow-lg font-bold text-lg border-2 border-white/60 backdrop-blur-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={handleOpen}
      >
        🎁 Special Surprise
      </button>
      {open && (
        <div
          className="mt-4 p-6 bg-white/90 rounded-3xl shadow-2xl border border-pink-200 max-w-xs text-center relative animate-fadeIn"
        >
          {/* <Lottie animationData={confettiAnimation} loop={false} style={{ height: 120 }} /> */}
          <p className="font-playfair text-xl text-pink-600 mb-2">{message}</p>
          <button onClick={handleClose} className="mt-2 px-4 py-1 bg-pink-100 text-pink-600 rounded-full font-semibold">Close</button>
        </div>
      )}
    </div>
  );
};

export default SurpriseBox;
