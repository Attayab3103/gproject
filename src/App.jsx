
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OurStory from './pages/OurStory';
import MahiSpecial from './pages/MahiSpecial';
import SorryMahi from './pages/SorryMahi';
import MyPromise from './pages/MyPromise';
import OurMoments from './pages/OurMoments';
import SpecialPage from './pages/SpecialPage';
import BouquetPage from './pages/BouquetPage';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/our-story" />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/mahi-special" element={<MahiSpecial />} />
        <Route path="/sorry-mahi" element={<SorryMahi />} />
        <Route path="/my-promise" element={<MyPromise />} />
        <Route path="/our-moments" element={<OurMoments />} />
        <Route path="/special" element={<SpecialPage />} />
        <Route path="/bouquet" element={<BouquetPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
