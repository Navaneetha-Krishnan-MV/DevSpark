import './App.css'
import { useState, useEffect } from 'react';
import Speaker from './Components/Speaker.tsx'
import ContactSection from './Components/ContactSection.tsx'
import SponserSection from './Components/SponserSection.tsx'
import Front from "./Components/Front.tsx"
import Navbar from "./Components/Navbar.tsx"
import Hurry from "./Components/Hurry.tsx"
import About from "./Components/About.tsx"
import Loading from "./Components/Load"
import Tracks from "./Components/Track.tsx"

function App() {
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <>
      <Navbar />
      <Front />
      <Hurry />
      <About />
      <Tracks />
      <Speaker />
      <SponserSection />
      <ContactSection />
    </>
  )
}
// n
export default App
