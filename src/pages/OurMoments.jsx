import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
  '/images/image0.png',
  '/images/image1.png',
  '/images/image2.png',
  '/images/image3.png',
];

const OurMoments = () => (
  <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-fuchsia-200 to-indigo-300 relative overflow-hidden">
    <div className="z-10 p-8 rounded-3xl bg-white/30 backdrop-blur-lg shadow-2xl max-w-3xl text-center border border-white/40">
      <h2 className="text-3xl md:text-4xl font-playfair font-bold text-fuchsia-600 mb-4">Our Moments</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-6">
        {galleryImages.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.15, duration: 0.7 }}
            className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl border-4 border-white/60 shadow-lg bg-white/10"
            whileHover={{ scale: 1.05, rotate: (Math.random() - 0.5) * 6 }}
          >
            <img
              src={src}
              alt={`Moment ${idx + 1}`}
              className="w-full h-full object-center object-cover md:object-cover transition-transform duration-300"
              style={{ objectPosition: 'center top' }}
            />
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="italic text-fuchsia-500 font-semibold"
      >
        “Every moment with you is a memory I cherish.”
      </motion.p>
    </div>
  </section>
);

export default OurMoments;
