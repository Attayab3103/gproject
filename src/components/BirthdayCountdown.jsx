import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

const getTimeLeft = () => {
  const now = new Date();
  let year = now.getFullYear();
  const nextBirthday = new Date(year, 8, 11); // September is month 8 (0-indexed)
  if (now > nextBirthday) year++;
  const target = new Date(year, 8, 11, 0, 0, 0);
  const diff = target - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <h2 className="text-xl xs:text-2xl md:text-3xl font-playfair text-pink-600 mb-2 drop-shadow-lg text-center">🎂 Mahi's Birthday Countdown</h2>
      <div className="flex flex-wrap justify-center gap-2 xs:gap-4 text-base xs:text-lg md:text-2xl font-poppins bg-white/60 px-2 xs:px-4 md:px-6 py-2 xs:py-3 rounded-3xl border-2 border-pink-200 backdrop-blur-lg shadow-xl">
        <span className="flex flex-col items-center"><b className="text-2xl xs:text-3xl md:text-4xl text-pink-500">{timeLeft.days}</b><span className="text-xs xs:text-sm">din</span></span>
        <span className="flex flex-col items-center"><b className="text-2xl xs:text-3xl md:text-4xl text-pink-500">{timeLeft.hours}</b><span className="text-xs xs:text-sm">ghante</span></span>
        <span className="flex flex-col items-center"><b className="text-2xl xs:text-3xl md:text-4xl text-pink-500">{timeLeft.minutes}</b><span className="text-xs xs:text-sm">minute</span></span>
        <span className="flex flex-col items-center"><b className="text-2xl xs:text-3xl md:text-4xl text-pink-500">{timeLeft.seconds}</b><span className="text-xs xs:text-sm">second</span></span>
      </div>
      <p className="mt-2 text-pink-500 font-semibold text-center text-sm xs:text-base">Aapka janamdin aane wala hai, Mahi! 🥳</p>
    </div>
  );
};

export default BirthdayCountdown;
