import React from 'react';
import { motion } from 'framer-motion';

const poetry = [
  {
    urdu: 'محبت میں یہ کمال بھی ضروری ہے\nکہ آپ کی ہر بات دل سے سنوں',
    roman: 'Mohabbat mein yeh kamal bhi zaroori hai,\nKe aap ki har baat dil se sunoon.',
    trans: 'In love, it’s important to listen to every word of yours with my heart.'
  },
  {
    urdu: 'آپ کی مسکراہٹ میری کمزوری ہے\nآپ کی خوشی میری زندگی ہے',
    roman: 'Aap ki muskurahat meri kamzori hai,\nAap ki khushi meri zindagi hai.',
    trans: 'Your smile is my weakness, your happiness is my life.'
  },
  {
    urdu: 'میری دعاؤں میں ہمیشہ آپ کا نام رہتا ہے\nمیری ہر سانس میں صرف آپ کا پیار رہتا ہے',
    roman: 'Meri duaon mein hamesha aap ka naam rehta hai,\nMeri har saans mein sirf aap ka pyaar rehta hai.',
    trans: 'Your name is always in my prayers, your love in every breath.'
  },
  {
    urdu: 'آپ کے بغیر یہ دل ادھورا ہے\nآپ کے ساتھ ہر لمحہ پورا ہے',
    roman: 'Aap ke bagair yeh dil adhoora hai,\nAap ke saath har lamha poora hai.',
    trans: 'Without you, my heart is incomplete; with you, every moment is whole.'
  },
];

const UrduPoetry = () => (
  <div className="w-full flex flex-col items-center py-6 px-2">
    <h2 className="text-xl xs:text-2xl md:text-3xl font-playfair text-pink-600 mb-4 drop-shadow-lg text-center">🌹 Romantic Urdu Poetry</h2>
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {poetry.map((verse, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: idx * 0.2 }}
          className="rounded-3xl bg-white/70 border-2 border-pink-200 shadow-lg p-4 text-center backdrop-blur-lg"
        >
          <p className="font-bold text-lg xs:text-xl text-fuchsia-700 leading-relaxed mb-2" dir="rtl" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>{verse.urdu}</p>
          <p className="text-pink-600 italic text-base xs:text-lg mb-1">{verse.roman}</p>
          <p className="text-gray-600 text-xs xs:text-sm">{verse.trans}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default UrduPoetry;
