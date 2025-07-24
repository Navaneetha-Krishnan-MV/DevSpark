import { useEffect } from 'react';
import Landing from './Landing';
import AboutEvent from './AboutEvent';

type MosaicProps = {
  setCurrentPage: (page: 'home' | 'devforge' | 'mosaic' | 'bizpulse') => void;
};

const Mosaic = ({ setCurrentPage }: MosaicProps) => {
  useEffect(() => {
    setCurrentPage('mosaic');
  }, [setCurrentPage]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#ff7200]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#ffae00]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 114, 0, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 114, 0, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Landing />
        <AboutEvent />
        
      </div>
    </div>
  );
};

export default Mosaic;
