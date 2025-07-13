import React, { useState, useRef } from 'react';

// Local music file served from public/music
const romanticMusic = '/music/Warm-Memories-Emotional-Inspiring-Piano(chosic.com).mp3';

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start">
      <button
        onClick={toggleMusic}
        className={`px-5 py-2 rounded-full font-bold shadow-lg border-2 border-white/60 backdrop-blur-lg transition-all duration-300 ${playing ? 'bg-pink-500 text-white' : 'bg-white/80 text-pink-600'}`}
      >
        {playing ? '🎶 Pause Music' : '🎶 Play Music'}
      </button>
      <audio ref={audioRef} src={romanticMusic} loop />
    </div>
  );
};

export default MusicToggle;
