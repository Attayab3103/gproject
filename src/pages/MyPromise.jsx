
import React from 'react';
import { motion } from 'framer-motion';

const MyPromise = () => (
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
        className="text-3xl md:text-4xl font-playfair font-bold text-indigo-600 mb-4"
      >
        My Promise
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl font-poppins text-gray-800 mb-6"
      >
        Mahi, main wada karta hoon ke har khushi, har gham mein aapka saath dunga. Aapka humsafar, aapka dost, aapka Attayab hamesha aapke saath rahega. Zindagi ke har mod par, main aapka intezaar karunga aur aapko kabhi akela mehsoos nahi hone dunga.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="italic text-indigo-500 font-semibold"
      >
        “Mera dil, meri zindagi sirf aapke liye hai, Mahi.”
      </motion.p>
    </motion.div>
  </section>
);

export default MyPromise;
