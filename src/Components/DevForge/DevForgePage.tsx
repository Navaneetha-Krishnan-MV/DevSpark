import { useEffect } from 'react';
import DevForge from './DevForge';

type PageProps = {
  setCurrentPage: (page: 'home' | 'devforge' | 'mosaic' | 'bizpulse') => void;
};

const DevForgePage = ({ setCurrentPage }: PageProps) => {
  useEffect(() => {
    setCurrentPage('devforge');
  }, [setCurrentPage]);

  return <DevForge setCurrentPage={setCurrentPage} currentPage="devforge" />;
};

export default DevForgePage;
