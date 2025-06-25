import { useState } from 'react'
import './App.css'
import DeadLine from './Components/DeadLine.tsx'
import AboutEvent from './Components/AboutEvent.tsx'
import WhoCanJoin from './Components/WhoCanJoin.tsx'
import Jury from './Components/Jury.tsx'
import ContactSection from './Components/ContactSection.tsx'
import SponserSection from './Components/SponserSection.tsx'
import Home from './Components/Home.tsx'

function App() {

  return (
    <>
      <DeadLine />
      <AboutEvent />
      <WhoCanJoin />
      <Jury />
      <SponserSection />
      <ContactSection />
    </>
  )
}

export default App
