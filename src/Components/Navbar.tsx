import React, { useState, useEffect } from 'react';
import Logo from '/Logo.jpeg'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = href === '#about' || href === '#jury' ? 80 : 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Speaker', href: '#speaker' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        isScrolled ? 'bg-black backdrop-blur-md shadow-lg' : 'bg-black backdrop-blur-md'
      }`}>
        <div className="max-w-10xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Sponsor Logos */}
            <div className="flex items-center min-w-0 flex-1">
              <div className="flex-shrink-0">
                <img src={Logo} className="h-12 w-auto object-contain" alt="DevSpark Logo" />
              </div>
              
              {/* Sponsor Logos - Hide on smaller screens, show progressively */}
              <div className="hidden lg:flex items-center ml-4 xl:ml-6">
                <div className="h-6 lg:h-8 border-l border-gray-600 mr-4 xl:mr-6"></div>
                <div className="flex items-center gap-3 xl:gap-5">
                  <img src="/IEEE_logo.png" className="h-6 lg:h-8 w-auto" alt="IEEE Logo" />
                  <img src="/IEEE.png" className="h-6 lg:h-8 w-auto" alt="IEEE Logo" />
                  <img src="/HIZE IEEE.png" className="h-6 lg:h-8 w-auto" alt="IEEE SYP Logo" />
                </div>
              </div>
            </div>

            {/* Center - Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-baseline gap-4 xl:gap-6 2xl:gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-gray-300 hover:bg-gradient-to-r hover:from-[#ff7200] hover:to-[#ffae00] hover:bg-clip-text hover:text-transparent px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-all duration-200 relative group whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff7200] to-[#ffae00] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Register Button */}
            <div className="hidden md:block flex-shrink-0">
              <a 
                href="https://unstop.com/o/SzV3A1F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#ff7200] to-[#ffae00] text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-lg text-sm lg:text-base font-medium hover:from-[#ff7a0d] hover:to-[#ffb82e] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 inline-block cursor-pointer whitespace-nowrap"
              >
                Register Now
              </a>
            </div>

            {/* Mobile Sponsor Logos - Show on right side */}
            <div className="flex md:hidden lg:hidden items-center gap-2 mr-2">
              <img src="/IEEE_logo.png" className="h-5 w-auto" alt="IEEE Logo" />
              <img src="/IEEE.png" className="h-5 w-auto" alt="IEEE Logo" />
              <img src="/HIZE IEEE.png" className="h-5 w-auto" alt="IEEE SYP Logo" />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden lg:hidden bg-slate-900/95 backdrop-blur-md">
              <div className="px-4 pt-4 pb-6">
                {/* Mobile Navigation Items */}
                <div className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        scrollToSection(e, item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-300 hover:bg-gradient-to-r hover:from-[#ff7200] hover:to-[#ffae00] hover:bg-clip-text hover:text-transparent block px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg hover:bg-gray-800/50"
                    >
                      {item.name}
                    </a>
                  ))}
                  
                  {/* Mobile Register Button */}
                  <a 
                    href="https://unstop.com/o/SzV3A1F" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full mt-4 bg-gradient-to-r from-[#ff7200] to-[#ffae00] text-white px-6 py-3 rounded-lg font-medium hover:from-[#ff7a0d] hover:to-[#ffb82e] transition-all duration-200 text-center"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Spacer div to account for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;