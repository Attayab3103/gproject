import React from 'react';
import Typewriter from 'typewriter-effect';

const LoveTypewriter = () => (
  <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-2 pointer-events-none">
    <span className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-playfair text-pink-600 drop-shadow-lg bg-white/40 px-2 xs:px-4 md:px-6 py-2 rounded-2xl border border-pink-200 backdrop-blur-lg max-w-full whitespace-nowrap overflow-x-auto">
      <Typewriter
        options={{
          strings: [
            'I Love You, Mahi 💖',
            'You are my forever.',
            'Attayab & Mahi = Infinity',
            'My heart belongs to you.'
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </span>
  </div>
);

export default LoveTypewriter;
