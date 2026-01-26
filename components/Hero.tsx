import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
          Transform Information Overload Into <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
            Strategic Clarity
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
          Battle-tested digital systems used by 15,000+ knowledge workers to think clearer, work smarter, and achieve more. 
          <span className="block mt-2 text-purple-400 font-semibold">Stop drowning in tabs. Start building your intellectual empire.</span>
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a 
            href="#products" 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            Explore Systems
          </a>
          <button className="px-8 py-3 border-2 border-gray-600 text-gray-200 font-semibold rounded-full hover:border-purple-500 hover:text-white hover:bg-purple-500/10 transition-all">
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