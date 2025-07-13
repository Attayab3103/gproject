
import React from 'react';
import { motion } from 'framer-motion';

const qualities = [
  'Physics ki queen, hamesha curious aur intelligent',
  'Itni caring aur pyari, sab ka khayal rakhti hain',
  'Aapki muskurahat se din roshan ho jata hai',
  'Aap mujhe behtar insan banati hain',
  'Himmatwali, sapno se bhari hui',
  'Meri sab se achi dost aur humsafar',
];

const MahiSpecial = () => (
  <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-fuchsia-200 to-indigo-300 relative overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="z-10 p-6 xs:p-8 rounded-3xl bg-white/30 backdrop-blur-lg shadow-2xl max-w-2xl w-full text-center border border-white/40"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-3xl md:text-4xl font-playfair font-bold text-fuchsia-600 mb-4"
      >
        Mahi, You Are Special
      </motion.h2>
      <ul className="text-lg md:text-xl font-poppins text-gray-800 mb-6 list-disc list-inside text-left mx-auto max-w-md">
        {qualities.map((q, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.18, duration: 0.7 }}
            className="mb-1"
          >
            {q}
          </motion.li>
        ))}
      </ul>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="italic text-fuchsia-500 font-semibold"
      >
        “Aap meri rooh ki awaaz hain, Mahi.”
      </motion.p>
    </motion.div>
  </section>
);

export default MahiSpecial;
