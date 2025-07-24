import { useEffect } from 'react';
import About from './About';
import Landing from './Landing';

type BizPulseProps = {
  setCurrentPage: (page: 'home' | 'devforge' | 'mosaic' | 'bizpulse') => void;
};

const BizPulse = ({ setCurrentPage }: BizPulseProps) => {
  useEffect(() => {
    setCurrentPage('bizpulse');
  }, [setCurrentPage]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Landing />
      <About />
    </div>
  );
};

export default BizPulse;