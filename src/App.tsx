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
import Register from './Components/Register.tsx';
import HizeTeam from './Components/HizeTeam.tsx';
import { isRegistrationClosed } from './lib/registration';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<'home' | 'devforge' | 'mosaic' | 'bizpulse'>('home')
  const registrationClosed = isRegistrationClosed();

  useEffect(() => {
    document.title = "DevSpark'25"
    
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedDevSpark');
    
    if (hasVisitedBefore) {
      setIsLoading(false);
    } else {
      sessionStorage.setItem('hasVisitedDevSpark', 'true');
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 4100);
      
      return () => clearTimeout(timer);
    }
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
        {registrationClosed && (
          <div className="bg-black py-6">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="animate-pulse" style={{ animationDuration: '3s' }}>
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff7200] to-[#ffae00] opacity-30 rounded-xl blur-xl"></div>
                  <h2 className="relative text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff7200] to-[#ffae00] mb-4 py-2 px-4">
                    REGISTRATION CLOSED
                  </h2>
                </div>
                <p className="text-lg text-gray-300 mt-4">
                  Registration for DevSpark'25 has officially closed as of September 10, 2025.
                  <br />Thank you for your interest. We look forward to seeing all registered participants at the event!
                </p>
              </div>
            </div>
          </div>
        )}
        <Hurry />
        <About />
        <Tracks />
        <Speaker />
        <HizeTeam/>
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
          <Route path="/register" element={<Register />} />
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
        {registrationClosed && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#ff7200] to-[#ffae00] p-2 text-center text-white font-bold z-50">
            Registration closed on September 10, 2025
          </div>
        )}
        <ContactSection />
      </div>
    </Router>
  )
}

export default App
