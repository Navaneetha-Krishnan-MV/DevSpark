import React, { useCallback } from "react";
import ProfileCard from "../UI/ProfileCard";
import { toast } from "sonner";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface JuryMember {
  id: number;
  name: string;
  title: string;
  handle: string;
  status: string;
  avatarUrl: string;
  contactText: string;
  bio?: string;
}

const juryMembers: JuryMember[] = [
  {
    id: 1,
    name: "Javi A. Torres",
    title: "Software Engineer",
    handle: "javicodes",
    status: "Available",
    avatarUrl: "https://i.pravatar.cc/300?img=1",
    contactText: "Connect",
    bio: "Full-stack developer with expertise in React and Node.js.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "UI/UX Designer",
    handle: "sarahdesigns",
    status: "Online",
    avatarUrl: "https://i.pravatar.cc/300?img=2",
    contactText: "Message",
    bio: "Award-winning designer focused on user-centered design.",
  },
  {
    id: 3,
    name: "Alex Kumar",
    title: "Tech Lead",
    handle: "alextech",
    status: "Busy",
    avatarUrl: "https://i.pravatar.cc/300?img=3",
    contactText: "Schedule",
    bio: "Engineering leader with 10+ years in tech innovation.",
  },
];

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

const Jury: React.FC = () => {
  const handleContactClick = (member: JuryMember) => {
    toast.info(`Contacting ${member.name}`, {
      description: `Opening connection with ${member.title}...`,
      duration: 3000,
    });
  };

  // Render each row in the virtualized list
  const Row = useCallback(({ index, style }: RowProps) => {
    const member = juryMembers[index];
    return (
      <div 
        className="mx-auto w-full max-w-md md:max-w-none px-4 py-2"
        style={{
          ...style,
          opacity: 0,
          animation: 'fadeIn 0.5s forwards',
          animationDelay: `${index * 0.05}s`,
          willChange: 'transform, opacity'
        }}
      >
        <ProfileCard
          {...member}
          showUserInfo
          enableTilt={false}
          onContactClick={() => handleContactClick(member)}
          email="user@example.com"
          website="example.com"
          linkedin="username"
          github="username"
        />
      </div>
    );
  }, []);

  return (
    <section id="jury" className="w-full min-h-screen bg-black text-white py-16 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
              willChange: 'opacity'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 border border-cyan-400/30 rounded-full bg-cyan-400/5 backdrop-blur-sm">
              <span className="text-cyan-400 text-sm uppercase tracking-widest font-mono">
                Our Esteemed
              </span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
            JURY PANEL
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-12"></div>
        </div>

        {/* Virtualized Jury Members List */}
        <div className="h-[600px] w-full">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={juryMembers.length}
                itemSize={400}
                width={width}
                layout={width > 1024 ? 'horizontal' : 'vertical'}
                className="scrollbar-hide"
                overscanCount={3}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    </section>
  );
};

export default Jury;