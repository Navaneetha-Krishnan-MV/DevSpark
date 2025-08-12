import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Speaker from './Components/Speaker.tsx';
import ContactSection from './Components/ContactSection.tsx';
import SponserSection from './Components/SponserSection.tsx';
import Front from "./Components/Front.tsx";
import Navbar from "./Components/Navbar.tsx";
import Hurry from "./Components/Hurry.tsx";
import About from "./Components/About.tsx";
import Loading from "./Components/Load";
import Tracks from "./Components/Track.tsx";
import DevForgePage from './Components/DevForge/DevForgePage';
import MosaicPage from './Components/Mosaic/MosaicPage';
import BizPulsePage from './Components/BizPulse/BizPulsePage';
import Sponsers from './Components/Sponsers.tsx';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<'home' | 'devforge' | 'mosaic' | 'bizpulse'>('home')

  useEffect(() => {
    document.title = "DevSpark'25"
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4100) // Increased to 5 seconds to match the Load component animation
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading onComplete={() => setIsLoading(false)} />
  }

  const Home = () => {
    useEffect(() => {
      setCurrentPage("home");
    }, []);
    
    return (
      <>
        <Front />
        <Hurry />
        <About />
        <Tracks />
        <Speaker />
        <Sponsers />
        <SponserSection />
      </>
    );
  };

  return (
    <Router>
      <div className="bg-black">
        <Navbar currentPage={currentPage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devforge" element={
            <DevForgePage setCurrentPage={setCurrentPage} />
          } />
          <Route path="/mosaic" element={
            <MosaicPage setCurrentPage={setCurrentPage} />
          } />
          <Route path="/bizpulse" element={
            <BizPulsePage setCurrentPage={setCurrentPage} />
          } />
        </Routes>
        <ContactSection />
      </div>
    </Router>
  )
}

export default App
