import Spline from "@splinetool/react-spline"
import { Mail, Phone, User } from "lucide-react"
import {useMediaQuery} from "react-responsive"

const ContactSection = () => {
  const isMobile = useMediaQuery({ maxWidth: 800 })
  const coordinators = [
    {
      name: "Avinarasi S",
      role: "Chair",
      email: "22cs023@kpriet.ac.in",
      phone: "+91 9385405744",
      avatar: "AS",
    },
    {
      name: "Kanimozhi BV",
      role: "Vice Chair",
      email: "22cs059@kpriet.ac.in",
      phone: "+91 9384945040",
      avatar: "KB",
    },
    {
      name: "Navaneethakrishnan M V",
      role: "Secretary",
      email: "23cs113@kpriet.ac.in",
      phone: "+91 9787825610",
      avatar: "NK",
    },
    {
      name: "Harini L",
      role: "Joint Secretary",
      email: "23cs056@kpriet.ac.in",
      phone: "+91 8667877621",
      avatar: "HL",
    },
    {
      name: "Kanimuthu AR M",
      role: "Treasurer",
      email: "23cs076@kpriet.ac.in",
      phone: "+91 9600477801",
      avatar: "KM",
    },
    {
      name: "Nitish P K",
      role: "Head Designer",
      email: "23cs118@kpriet.ac.in",
      phone: "+91 9677491055",
      avatar: "NP",
    },
  ]
  

  return (

    
    <section id="contact" className="relative isolate py-20 bg-black" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255, 114, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 114, 0, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 10 10 L 90 10 L 90 90 L 10 90 Z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-[#ff7200]/20"
              />
              <circle cx="10" cy="10" r="2" fill="currentColor" className="text-[#ff7200]/30" />
              <circle cx="90" cy="90" r="2" fill="currentColor" className="text-[#ff7200]/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6" style={{ overflow: "visible" }}>
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-6 py-2 border border-[#ff7200]/30 rounded-full bg-gradient-to-r from-[#ff7200]/10 to-[#ffae00]/10 backdrop-blur-sm">
              <span className="text-[#ff7200] text-sm uppercase tracking-widest font-mono flex items-center space-x-3">
                <User className="w-5 h-5 flex-shrink-0" />
                <span>Connect With Us</span>
              </span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-[#ffae00]">
            CONTACT TEAM
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Ready to revolutionize the future? Connect with our coordinators who are here to guide your journey.
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#ff7200] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-7 relative z-20">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {coordinators.map((coordinator) => (
                <div
                  key={coordinator.name}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#ff7200]/20 hover:border-[#ff7200]/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                >
                  {/* Glow Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff7200]/5 via-transparent to-[#ffae00]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff7200]/20 via-transparent to-[#ff7200]/20 animate-pulse"></div>
                  </div>

                  <div className="relative p-4">
                    {/* Avatar */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#ff7200] to-[#ffae00] rounded-full flex items-center justify-center text-black font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                          {coordinator.avatar}
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-[#ff7200]/30 scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                        <div className="absolute inset-0 rounded-full bg-[#ff7200]/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#ffae00] transition-colors duration-300">
                        {coordinator.name}
                      </h3>
                      <p className="text-[#ff8a00] text-sm font-mono uppercase tracking-wider">{coordinator.role}</p>
                    </div>

                    {/* Email & Phone */}
                    <div className="space-y-3">
                      <a
                        href={`mailto:${coordinator.email}`}
                        className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/50 group-hover:bg-gray-800/70 hover:bg-[#ff7200]/10 transition-colors duration-300 group/item"
                      >
                        <Mail className="w-5 h-5 text-[#ff8a00] group-hover/item:scale-110 transition-transform duration-200 flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-mono truncate group-hover/item:text-[#ffae00] break-all ml-3">
                          {coordinator.email}
                        </span>
                      </a>

                      <a
                        href={`tel:${coordinator.phone.replace(/\s/g, "")}`}
                        className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/50 group-hover:bg-gray-800/70 hover:bg-[#ff7200]/10 transition-colors duration-300 group/item"
                      >
                        <Phone className="w-5 h-5 text-[#ff8a00] group-hover:item:scale-110 transition-transform duration-200 flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-mono group-hover:item:text-[#ffae00] break-all ml-3">
                          {coordinator.phone}
                        </span>
                      </a>
                    </div>

                  </div>

                  {/* Bottom Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff7200] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
          
          {!isMobile && <div className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[900px] mx-auto lg:col-span-5">
  {/* Responsive container box */}
  <div className="relative w-full aspect-[1/1] sm:aspect-[4/3] md:aspect-[1] overflow-visible">
    <div
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{
        width: '100%',
        height: '100%',
        transform: 'translateZ(0)',
      }}
    >
      <div className="w-full h-full relative">
        <div className="absolute inset-0 lg:scale-[1.3] lg:translate-x-20 transition-transform duration-300 ease-in-out">
          <Spline
            scene="./robot.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  </div>
</div>}

        {/* Bottom Message - Centered */}
        <div className="col-span-full flex justify-center mt-12 mb-4 w-full relative z-30">
          <div className="inline-flex items-center space-x-2 sm:space-x-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#ff7200]/10 via-[#ff8a00]/10 to-[#ff7200]/10 rounded-2xl border border-[#ff7200]/30 backdrop-blur-sm shadow-lg">
            <span className="text-[#ffae00] mr-3 font-mono text-sm sm:text-lg md:text-xl whitespace-nowrap">Ready to Spark Innovation?</span>
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#ff8a00] rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#ff8a00] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#ff8a00] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection