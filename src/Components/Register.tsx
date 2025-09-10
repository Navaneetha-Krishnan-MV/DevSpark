import Logo from '/Logo.jpeg'

const Register = () => {
  return (
    <section id="tracks" className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className='w-24 h-24 rounded-lg flex items-center justify-center mx-auto mb-8'>
          <img src={Logo} alt="DevSpark Logo" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff7200] to-[#ffae00] mb-6">
          REGISTRATION CLOSED
        </h1>
      </div>
    </section>
  );
};

export default Register;

