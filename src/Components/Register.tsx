import Logo from '/Logo.jpeg'

const Register = () => {

  const tracks = [
    {
      id: 'devforge',
      title: 'DevForge - 24 Hours Hackthon ( External )',
      route: 'https://forms.gle/RMwToJpPsgaAWtbG6'
    },

    {
      id: 'mosaic',
      title: 'Mosaic - Tech Bootcamp ( External )',
      route: 'https://forms.gle/CKmbE7ZaCZaz4XLy9'
    },

    {
      id: 'bizpulse',
      title: 'BizPulse - Business & Leadership forum ( External )',
      route: 'https://forms.gle/XEbBrRLzsVTsEY7z7'
    },

    {
      id: 'devforge-internal',
      title: 'DevForge Internal',
      route: 'https://forms.gle/KChzhfigAURuHgFF8'
    },

    {
      id: 'mosaic-internal',
      title: 'Mosaic Internal',
      route: 'https://forms.gle/6Z4U4M1LpZqkKLjw8'
    },

    {
      id: 'bizpulse-internal',
      title: 'BizPulse Internal',
      route: 'https://forms.gle/Gg5RSbu74aYiATs2A'
    }
  ];

  const handleTrackClick = (route: string) => {
    window.open(route, '_blank');
  };

  return (
    <section id="tracks" className="min-h-screen bg-black  ">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className='w-24 h-24  rounded-lg flex items-center justify-center mx-auto mb-6'>
              <img src={Logo} alt="" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            DevSpark'25
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            DevSpark'25 is a national-level tech event hosted at<br />
            KPRIET, Coimbatore, featuring a 24-hour hackathon,<br />
            expert-led bootcamp, and a business & leadership forum
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="flex flex-wrap gap-4  justify-center ">
          {tracks.map((track) => (
            <a
              key={track.id}
              onClick={(e) => {
                e.preventDefault();
                handleTrackClick(track.route);
              }}
              className="block w-150 bg-gradient-to-r from-[#ff7200] to-[#ffae00] rounded-lg p-6 cursor-pointer hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] group"
            >
                <h2 className="text-white text-center font-medium text-lg">
                  {track.title}
                </h2>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Register;
