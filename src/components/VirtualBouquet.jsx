import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

const flowers = [
  { name: 'Rose', color: '#e63946', petalCount: 8, meaning: 'Your love and beauty' },
  { name: 'Tulip', color: '#fbbf24', petalCount: 6, meaning: 'Your kindness' },
  { name: 'Sunflower', color: '#facc15', petalCount: 16, meaning: 'Your positivity' },
  { name: 'Cherry Blossom', color: '#f9a8d4', petalCount: 5, meaning: 'Your gentleness' },
  { name: 'Hibiscus', color: '#f472b6', petalCount: 5, meaning: 'Your vibrant spirit' },
  { name: 'Daisy', color: '#fff', petalCount: 8, meaning: 'Your innocence' },
  { name: 'Lotus', color: '#a7f3d0', petalCount: 8, meaning: 'Your strength' },
  { name: 'Blossom', color: '#fcd34d', petalCount: 7, meaning: 'How you make life beautiful' },
  { name: 'Butterfly', color: '#a78bfa', petalCount: 4, meaning: 'Your transformation and growth' },
  { name: 'Heart', color: '#f43f5e', petalCount: 2, meaning: 'My love for you' },
];

// Simple 3D flower model
function Flower3D({ position, color, petalCount, name }) {
  // Petal geometry: use spheres for petals, cylinder for stem
  const petals = [];
  const petalRadius = 0.18;
  const flowerRadius = 0.32;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    petals.push(
      <mesh key={i} position={[Math.cos(angle) * flowerRadius, 0.18, Math.sin(angle) * flowerRadius]}>
        <sphereGeometry args={[petalRadius, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
  // Center
  return (
    <group position={position}>
      {/* Stem */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 1.1, 12]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
      {/* Petals */}
      {petals}
      {/* Center */}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}
const VirtualBouquet = () => {
  const [bouquet, setBouquet] = useState([]);
  const [showMeaning, setShowMeaning] = useState(null);

  const handlePick = (flower) => {
    if (!bouquet.includes(flower)) setBouquet([...bouquet, flower]);
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2 className="text-xl xs:text-2xl md:text-3xl font-playfair text-pink-600 mb-4 drop-shadow-lg text-center">💐 Build Your Virtual Bouquet</h2>
      <p className="mb-4 text-pink-500 text-center max-w-xl">Each flower represents a quality I love about you. Tap to add it to your bouquet!</p>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {flowers.map((flower, i) => (
          <motion.button
            key={flower.name}
            whileTap={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
            whileHover={{ scale: 1.15 }}
            className={`rounded-full border-2 px-4 py-2 text-2xl md:text-3xl shadow-lg transition-all duration-300 bg-white/80 border-pink-200 hover:bg-pink-50 font-bold flex flex-col items-center ${bouquet.includes(flower) ? 'bg-pink-100 border-pink-400 scale-105' : ''}`}
            onClick={() => handlePick(flower)}
            onMouseEnter={() => setShowMeaning(i)}
            onMouseLeave={() => setShowMeaning(null)}
            aria-label={flower.name}
          >
            {flower.emoji}
            <span className="text-xs text-pink-500 mt-1 font-normal">{flower.name}</span>
            <AnimatePresence>
              {showMeaning === i && !bouquet.includes(flower) && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute mt-10 left-1/2 -translate-x-1/2 bg-white/90 border border-pink-200 rounded-xl px-3 py-1 text-xs text-pink-600 shadow-md z-50"
                >
                  {flower.meaning}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      <div className="w-full max-w-lg min-h-[320px] flex flex-col items-center justify-center bg-white/60 border-2 border-pink-200 rounded-3xl shadow-xl py-6 px-4 relative overflow-visible">
        <h3 className="text-lg md:text-xl font-playfair text-fuchsia-600 mb-2">Your 3D Bouquet</h3>
        {bouquet.length === 0 ? (
          <p className="text-pink-400 italic">No flowers picked yet. Start building your bouquet!</p>
        ) : (
          <div className="w-full h-[260px] md:h-[320px] relative rounded-xl overflow-hidden bg-gradient-to-b from-pink-100 to-white border border-pink-200 shadow-inner">
            <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }} shadows>
              <ambientLight intensity={0.7} />
              <directionalLight position={[2, 6, 5]} intensity={0.7} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
              <Stage intensity={0.5} environment={null} shadows={false}>
                {bouquet.map((flower, i) => {
                  // Arrange in a fan, with some randomness for realism
                  const angle = (i - (bouquet.length - 1) / 2) * 0.35 + (Math.random() - 0.5) * 0.08;
                  const x = Math.sin(angle) * 0.8;
                  const z = Math.cos(angle) * 0.5 + (Math.random() - 0.5) * 0.2;
                  const y = 0;
                  return (
                    <Flower3D
                      key={flower.name}
                      position={[x, y, z]}
                      color={flower.color}
                      petalCount={flower.petalCount}
                      name={flower.name}
                    />
                  );
                })}
                {/* 3D Ribbon: a torus at the base */}
                {bouquet.length > 1 && (
                  <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1, 0.09, 16, 100]} />
                    <meshStandardMaterial color="#f472b6" />
                  </mesh>
                )}
              </Stage>
              <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.7} />
            </Canvas>
          </div>
        )}
        {bouquet.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-pink-600 text-center text-base md:text-lg font-poppins"
          >
            This bouquet is just for you, Mahi! Each flower is a piece of my heart and a reason I love you. 💖
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default VirtualBouquet;
