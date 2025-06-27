import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLanding, setIsLanding] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'tracks', 'schedule', 'prizes', 'jury', 'sponsors', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            setIsLanding(section === 'home');
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Tracks', href: 'tracks' },
    { name: 'Schedule', href: 'schedule' },
    { name: 'Prizes', href: 'prizes' },
    { name: 'Jury', href: 'jury' },
    { name: 'Sponsors', href: 'sponsors' },
    { name: 'Contact', href: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      !isLanding || isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent backdrop-blur-0 shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="home" 
              smooth={true} 
              duration={500} 
              className="text-2xl font-bold text-white cursor-pointer flex items-center"
              onClick={() => scrollToSection('home')}
            >
              <span className="text-cyan-400">Dev</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Spark</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
                    activeSection === item.href 
                      ? 'text-cyan-400' 
                      : `${isLanding && !isScrolled ? 'text-white' : 'text-gray-300'} hover:text-cyan-400`
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transition-all duration-300 ${
                    activeSection === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                </button>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <div className="hidden md:block ml-6">
            <a 
              href="#register" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 inline-flex items-center"
            >
              Register Now
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-slate-900/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`w-full text-left px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
                activeSection === item.href 
                  ? 'bg-slate-800 text-cyan-400' 
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
          <a 
            href="#register"
            className="w-full block mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
          >
            Register Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
