import './App.css'
import { useEffect } from 'react';
import AboutEvent from './Components/AboutEvent.tsx'
import WhoCanJoin from './Components/WhoCanJoin.tsx'
import Jury from './Components/Jury.tsx'
import ContactSection from './Components/ContactSection.tsx'
import SponserSection from './Components/SponserSection.tsx'
import Front from "./Components/Front.tsx"
import Navbar from "./Components/Navbar.tsx"
import Hurry from "./Components/Hurry.tsx"

function App() {
  useEffect(() => {
    document.title = "DevSpark'25";
  }, []);

  return (
    <>
    <Navbar />
      <Front />
      <Hurry />
      <AboutEvent />
      <WhoCanJoin />
      <Jury />
      <SponserSection />
      <ContactSection />
    </>
  )
}

export default App
