import { useEffect } from 'react';
import AboutEvent from './AboutEvent';
import WhoCanJoin from './WhoCanJoin';
import Jury from './Jury';
import Landing from './Landing';

type DevForgeProps = {
  setCurrentPage: (page: 'home' | 'devforge' | 'mosaic' | 'bizpulse') => void;
  currentPage: string;
};

const DevForge = ({ setCurrentPage, currentPage }: DevForgeProps) => {
  useEffect(() => {
    if (currentPage !== 'devforge') {
      setCurrentPage('devforge');
    }
  }, [setCurrentPage, currentPage]);

  return (
    <>
      <Landing />
      <AboutEvent />
      <WhoCanJoin />
      <Jury />
    </>
  );
};

export default DevForge;