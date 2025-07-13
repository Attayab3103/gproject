import React from 'react';



import BirthdayCountdown from '../components/BirthdayCountdown';
import WhyILoveYouWall from '../components/WhyILoveYouWall';

import ConfettiMobile from '../components/ConfettiMobile';
import { motion } from 'framer-motion';

const SpecialPage = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-fuchsia-200 to-indigo-200 py-8 relative overflow-x-hidden">
    <ConfettiMobile />
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="w-full flex flex-col items-center"
    >
      <BirthdayCountdown />
      <div className="my-8" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="w-full"
      >
        <WhyILoveYouWall />
      </motion.div>
    </motion.div>
  </div>
);

export default SpecialPage;
