const sponsors = [
    {
      name: 'DEVFOLIO',
      logo: '/sponsors/devfolio.png',
      url: 'https://devfolio.co/',
    },
    {
      name: 'ETHINDIA',
      logo: '/sponsors/ethindia.png',
      url: 'https://ethindia.co/',
    },
  ];
  
  const Sponsors = () => {
    return (
      <section className="relative py-16 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1a1a1a 1px, transparent 1px),
                linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-[#ffae00] text-center">
            Our Sponsors
          </h2>
          
          {/* Centered grid layout */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
              {sponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="flex justify-center"
                >
                    <div className="relative p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 w-80 h-64 flex flex-col">
                      <div className="flex-grow flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} LOGO`}
                          className="max-h-40 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="mt-6 text-center">
                        <h3 className="text-2xl font-semibold text-white">{sponsor.name}</h3>
                      </div>
                      <div className="flex justify-center mt-6">
                        <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors duration-300">
                          Visit website
                        </a>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-16  "> 
            <img src="/01.png" alt="" onClick={() => window.open('https://devfolio.co/hackathons', '_blank')} />
          </div>
          
        </div>
      </section>
    );
  };
  
  export default Sponsors;