import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loveNotes = [
  'You are my best friend and soulmate.',
  'Every day with you is a new adventure.',
  'Your laughter is my favorite melody.',
  'You inspire me to be a better person.',
  'I love the way you care for everyone.',
  'Your hugs are my safe place.',
  'You make even ordinary days magical.',
  'Your smile brightens my darkest days.',
  'I love your passion and dreams.',
  'You are my home, wherever we are.',
  'With you, I feel truly loved.',
  'You are my forever and always.',
  'You make my heart skip a beat.',
  'I love your kindness and strength.',
  'You are my greatest blessing.',
  'You are my sunshine after the rain.',
  'I love your silly jokes and giggles.',
  'You are my favorite hello and hardest goodbye.',
  'You are the reason I believe in love.',
  'I love you more every single day.'
];

const LoveNotesWall = () => {
  const [notes, setNotes] = useState(loveNotes.map((note, i) => ({ note, revealed: false, id: i })));

  const handleReveal = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, revealed: true } : n));
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-xl xs:text-2xl md:text-3xl font-playfair text-fuchsia-600 mb-4 drop-shadow-lg text-center">💌 Wall of Love Notes</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4 max-w-3xl w-full px-2">
        {notes.map(({ note, revealed, id }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + id * 0.05, duration: 0.5 }}
            className={`relative transition-all duration-300 ${revealed ? 'scale-105 opacity-100' : 'opacity-60'}`}
          >
            <button
              className={`w-full h-20 xs:h-24 md:h-28 rounded-3xl border-2 border-fuchsia-200 bg-white/70 font-poppins text-fuchsia-700 text-base xs:text-lg md:text-xl shadow-xl transition-all duration-300 flex items-center justify-center px-2 py-2 ${revealed ? 'bg-fuchsia-100 border-fuchsia-400 scale-105' : 'hover:bg-fuchsia-50'}`}
              onClick={() => handleReveal(id)}
              disabled={revealed}
            >
              <AnimatePresence>
                {revealed ? (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {note}
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-fuchsia-400"
                  >
                    Tap to reveal
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoveNotesWall;
