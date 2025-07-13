import React, { useRef, useEffect } from 'react';

const HeartParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const hearts = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 16 + Math.random() * 16,
      speed: 0.5 + Math.random() * 1.2,
      alpha: 0.5 + Math.random() * 0.5,
      dx: (Math.random() - 0.5) * 0.5,
    }));

    function drawHeart(x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size * 1.2);
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 99, 132, 0.8)';
      ctx.shadowColor = '#ffb6d5';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(heart => {
        drawHeart(heart.x, heart.y, heart.size, heart.alpha);
        heart.y += heart.speed;
        heart.x += heart.dx;
        if (heart.y > window.innerHeight + 40) {
          heart.y = -40;
          heart.x = Math.random() * window.innerWidth;
        }
        if (heart.x < -40 || heart.x > window.innerWidth + 40) {
          heart.x = Math.random() * window.innerWidth;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    />
  );
};

export default HeartParticles;
