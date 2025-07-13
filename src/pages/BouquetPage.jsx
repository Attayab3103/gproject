import React from 'react';
import VirtualBouquet from '../components/VirtualBouquet';

const BouquetPage = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-fuchsia-200 to-indigo-200 py-8 relative overflow-x-hidden">
    <VirtualBouquet />
  </div>
);

export default BouquetPage;
