import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
          Architect Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
            Internal World
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-mist">
          Premium digital systems for knowledge management, focus, and clarity. 
          Stop drowning in information. Start building a legacy of thought.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button className="px-8 py-3 bg-white text-obsidian font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg shadow-white/10">
            Explore Systems
          </button>
          <button className="px-8 py-3 border border-cement text-white font-semibold rounded-full hover:border-accent hover:text-accent transition-all">
            Our Manifesto
          </button>
        </div>
      </div>
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default Hero;