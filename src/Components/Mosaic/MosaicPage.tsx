import { useEffect } from 'react';
import Mosaic from './Mosaic';

type PageProps = {
  setCurrentPage: (page: 'home' | 'devforge' | 'mosaic' | 'bizpulse') => void;
};

const MosaicPage = ({ setCurrentPage }: PageProps) => {
  useEffect(() => {
    setCurrentPage('mosaic');
  }, [setCurrentPage]);

  return <Mosaic setCurrentPage={setCurrentPage} />;
};

export default MosaicPage;
