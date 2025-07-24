import { useEffect } from 'react';
import BizPulse from './BizPulse';

type PageProps = {
  setCurrentPage: (page: 'home' | 'devforge' | 'mosaic' | 'bizpulse') => void;
};

const BizPulsePage = ({ setCurrentPage }: PageProps) => {
  useEffect(() => {
    setCurrentPage('bizpulse');
  }, [setCurrentPage]);

  return <BizPulse setCurrentPage={setCurrentPage} />;
};

export default BizPulsePage;
