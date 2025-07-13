import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  'Aapki muskurahat sabse khoobsurat hai',
  'Aapka pyaar mujhe har din behtar banata hai',
  'Aapki baatein mere dil ko sukoon deti hain',
  'Aapka saath har gham ko khushi mein badal deta hai',
  'Aapki aankhon mein meri duniya hai',
  'Aapka gussa bhi pyaara lagta hai',
  'Aapki har baat mein ek mithaas hai',
  'Aap mujhe bina kahe samajh jaati hain',
  'Aap mere sapno ki rani hain',
  'Aapka khayal mujhe hamesha khush rakhta hai',
  'Aapke bina sab kuch adhoora hai',
  'Aap mere liye sabse khaas ho',
  'Aapka pyaar sabse anmol tohfa hai',
  'Aapki hansi mere liye jadoo hai',
  'Aap mere har din ko roshan kar deti hain',
  'Aap mere liye duaon ka asar hain',
  'Aap mere har sapne ka sach hain',
  'Aapka saath sabse badi blessing hai',
  'Aap mere liye Allah ki sabse khoobsurat neamat hain',
  'Aap mere dil ki rani hain',
];

const WhyILoveYouWall = () => {
  const [revealed, setRevealed] = useState([]);

  const handleReveal = (idx) => {
    if (!revealed.includes(idx)) setRevealed([...revealed, idx]);
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-xl xs:text-2xl md:text-3xl font-playfair text-pink-600 mb-4 drop-shadow-lg text-center">❤️ “Why I Love You” Wall</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4 max-w-3xl w-full px-2">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className={`relative transition-all duration-300 ${revealed.includes(idx) ? 'scale-105 opacity-100' : 'opacity-50'}`}
          >
            <button
              className={`w-full h-20 xs:h-24 md:h-28 rounded-3xl border-2 border-pink-200 bg-white/70 font-poppins text-pink-700 text-base xs:text-lg md:text-xl shadow-xl transition-all duration-300 flex items-center justify-center px-2 py-2 ${revealed.includes(idx) ? 'bg-pink-100 border-pink-400 scale-105' : 'hover:bg-pink-50'}`}
              onClick={() => handleReveal(idx)}
              disabled={revealed.includes(idx)}
            >
              {revealed.includes(idx) ? (
                <span className="text-center">{reason}</span>
              ) : (
                <span className="text-center text-pink-400">Tap to reveal</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyILoveYouWall;
