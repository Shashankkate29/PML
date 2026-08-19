import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// Eagerly load core pages to make navigation feel immediate
import Home from './pages/Home';
import About from './pages/About';
import Branches from './pages/Branches';
import Trainers from './pages/Trainers';
import RecoveryZone from './pages/RecoveryZone';
import NotFound from './pages/NotFound';

// Keep lazy loading only for dynamic, media-heavy pages
const BranchDetails = lazy(() => import('./pages/BranchDetails'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

export const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/branches/:slug" element={<BranchDetails />} />
        <Route path="/facilities" element={<Navigate to="/branches" replace />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/membership" element={<Navigate to="/branches" replace />} />
        <Route path="/recovery" element={<Navigate to="/recovery-zone" replace />} />
        <Route path="/recovery-zone" element={<RecoveryZone />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
