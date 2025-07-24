
import { ArrowRight, Code, Palette, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tracks = () => {
  //  Add tracks
  const navigate = useNavigate();

  const handleTrackClick = (route: string) => {
    navigate(route, { state: { from: 'track' } });
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  const tracks = [
    {
      id: 'devforge',
      title: 'DevForge',
      subtitle: 'Hackathon',
      description: 'Build innovative solutions, compete with the best developers, and forge your path to victory.',
      icon: Code,
      gradient: 'from-[#00b3ff] to-[#0088cc]',
      borderGradient: 'from-[#00b3ff] to-[#0088cc]',
      route: '/devforge'
    },
    {
      id: 'mosaic',
      title: 'Mosaic',
      subtitle: 'Bootcamp',
      description: 'Master cutting-edge technologies through hands-on learning and expert mentorship.',
      icon: Palette,
      gradient: 'from-[#c709e8] to-[#9a00c2]',
      borderGradient: 'from-[#c709e8] to-[#9a00c2]',
      route: '/mosaic'
    },
    {
      id: 'bizpulse',
      title: 'BizPulse',
      subtitle: 'Business',
      description: 'Transform ideas into thriving businesses with strategic insights and entrepreneurial skills.',
      icon: TrendingUp,
      gradient: 'from-[#2ECC71] to-[#27ae60]',
      borderGradient: 'from-[#2ECC71] to-[#27ae60]',
      route: '/bizpulse'
    }
  ];

  return (
    <section id="tracks" className="min-h-screen bg-black py-5 px-4 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-[#ff7200] bg-clip-text text-transparent mb-6">
            Choose Your Track
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select your path to excellence. Each track offers unique challenges and opportunities 
            to showcase your skills and achieve greatness.
           </p>
           <br />
           <p className='font-bold bg-gradient-to-r text-2xl from-white to-[#ff7200] bg-clip-text text-transparent'>Participants can choose only one track</p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => {
            const IconComponent = track.icon;
            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track.route)}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-transparent hover:border-[#ff7200]/50 transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff7200]/20 via-transparent to-[#ff7200]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Main Card */}
                <div className="relative p-8 h-full bg-black/70">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${track.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Track Number */}
                  <div className="text-sm font-mono text-[#ff8a00] mb-2">
                    Track {index + 1}
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className={`text-2xl font-bold text-white mb-1`}>
                    {track.title}
                  </h3>
                  <p className="text-lg text-gray-300 font-medium mb-4">
                    {track.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {track.description}
                  </p>

                  {/* Animated Underline */}
                  <div className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#ff7200] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center mb-6"></div>
                  
                  {/* CTA Button */}
                  <div className="flex items-center">
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#ff8a00] hover:text-white border border-[#ff7200] hover:bg-[#ff7200] rounded-lg transition-all duration-300 group-hover:translate-x-1">
                      Explore Track
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff8a00]/5 to-[#ff5200]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${track.borderGradient} opacity-0 group-hover:opacity-10 -z-10 blur-xl transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
