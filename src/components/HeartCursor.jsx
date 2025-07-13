import React, { useEffect, useRef } from 'react';

const HeartCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Hide on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 16}px`;
        cursorRef.current.style.top = `${e.clientY - 16}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Hide on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] w-8 h-8"
      style={{ filter: 'drop-shadow(0 0 8px #ff69b4)' }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 29s-13-8.35-13-16.5A7.5 7.5 0 0 1 16 7a7.5 7.5 0 0 1 13 5.5C29 20.65 16 29 16 29z"
          fill="#ff69b4"
          stroke="#fff"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default HeartCursor;
