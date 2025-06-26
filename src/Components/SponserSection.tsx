import IEEE from '/IEEE_logo.png';
import IEEECS from '/IEEE.png';

const SponsorSection = () => {
  const sponsors = [
    {
      name: "IEEE",
      logo: IEEE,
      description: "The world's largest technical professional organization dedicated to advancing technology for humanity.",
    },
    {
      name: "IEEE Computer Society",
      logo: IEEECS,
      description: "Premier source for information, inspiration and collaboration in computer science and engineering.",
    
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Grid Background */}
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 border border-cyan-400/30 rounded-full bg-cyan-400/5 backdrop-blur-sm">
              <span className="text-cyan-400 text-sm uppercase tracking-widest font-mono">
                Powered By
              </span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
            OUR SPONSORS
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </div>

        {/* Sponsors Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.name}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Card Content */}
              <div className="relative p-8 text-center">
                {/* Tier Badge */}
                {/* <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30">
                    <span className="text-cyan-300 text-xs font-mono uppercase tracking-wider">
                      {sponsor.tier}
                    </span>
                  </div>
                </div> */}

                {/* Logo */}
                <div className="mb-6">
                  <div className="w-40 h-24 mx-auto flex items-center justify-center">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 group-hover:from-cyan-200 group-hover:to-cyan-400 transition-all duration-300">
                  {sponsor.name}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {sponsor.description}
                </p>

                {/* Animated Underline */}
                <div className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-400/30 backdrop-blur-sm">
            <a href='https://google.com' target='_blank' className="text-cyan-300 font-mono">Want to sponsor DEVSPARK?</a>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;