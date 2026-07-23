import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Loader } from '../ui/Loader';
import { ErrorBoundary } from '../components/ErrorBoundary';

interface AppLayoutProps {
  children: React.ReactNode;
}

const pageVariants: any = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg-deep)' }}>
      <Navbar />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {children}
            </motion.div>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
