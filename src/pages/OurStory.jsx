
import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const OurStory = () => (
  <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-fuchsia-300 to-indigo-400 relative overflow-hidden">
    <div className="absolute inset-0 z-0 pointer-events-none" />
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="z-10 p-6 xs:p-8 rounded-3xl bg-white/30 backdrop-blur-lg shadow-2xl max-w-2xl w-full text-center border border-white/40"
    >
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-pink-600 mb-4 drop-shadow-lg">
        <Typewriter
          options={{
            strings: ['Our Story', 'Attayab & Mahi', 'A Love Journey'],
            autoStart: true,
            loop: true,
            delay: 60,
            deleteSpeed: 30,
            pauseFor: 1800,
          }}
        />
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl font-poppins text-gray-800 mb-6"
      >
        Jab se aap se mulaqat hui, zindagi rangon se bhar gayi. Aapki muskurahat, aapki baatein, sab kuch mere liye anmol hai. Har pal, har yaad, aapke saath ek khoobsurat kahani ban gayi hai. Mahi, aap meri zindagi ki sab se pyari wajah hain.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="italic text-pink-500 font-semibold"
      >
        “Aap hain to sab kuch hai, Mahi.”
      </motion.p>
    </motion.div>
  </section>
);

export default OurStory;
