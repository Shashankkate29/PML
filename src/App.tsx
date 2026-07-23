import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// Lazy loading pages for code splitting & bundle performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Branches = lazy(() => import('./pages/Branches'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Trainers = lazy(() => import('./pages/Trainers'));
const Membership = lazy(() => import('./pages/Membership'));
const RecoveryZone = lazy(() => import('./pages/RecoveryZone'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/recovery" element={<RecoveryZone />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
