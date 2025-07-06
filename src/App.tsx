import './App.css'
import { useState, useEffect } from 'react';
import AboutEvent from './Components/AboutEvent.tsx'
import WhoCanJoin from './Components/WhoCanJoin.tsx'
import Jury from './Components/Jury.tsx'
import ContactSection from './Components/ContactSection.tsx'
import SponserSection from './Components/SponserSection.tsx'
import Front from "./Components/Front.tsx"
import Navbar from "./Components/Navbar.tsx"
import Hurry from "./Components/Hurry.tsx"
import Loading from "./Components/Load"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = "DevSpark'25"
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Increased to 5 seconds to match the Load component animation
    
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
      <AboutEvent />
      <WhoCanJoin />
      <Jury />
      <SponserSection />
      <ContactSection />
    </>
  )
}
// n
export default App
