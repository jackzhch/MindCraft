import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">MindsCraft</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We're a team of knowledge workers, productivity obsessives, and system builders 
          who've spent years perfecting the art of information management.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="bg-charcoal border border-cement rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            In a world drowning in information, we believe the competitive advantage belongs to those 
            who can effectively capture, organize, and leverage knowledge. We've experienced firsthand 
            the frustration of scattered notes, forgotten insights, and the overwhelming feeling of 
            information overload.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            That's why we created MindsCraft—to share battle-tested systems that have helped us and 
            thousands of others transform chaos into clarity, and information into actionable intelligence.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">Meet the Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👨‍💻
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Alex Chen</h3>
            <p className="text-purple-400 font-medium mb-3">Founder & Systems Architect</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Former product manager at a Fortune 500 tech company. Built knowledge management 
              systems used by 10,000+ employees. Obsessed with PKM and mental models since 2015.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👩‍🎓
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dr. Sarah Martinez</h3>
            <p className="text-purple-400 font-medium mb-3">Learning Science Advisor</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ph.D. in Cognitive Science from Stanford. Published researcher on memory retention 
              and learning methodologies. Ensures our systems are grounded in neuroscience.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👨‍🏫
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Marcus Johnson</h3>
            <p className="text-purple-400 font-medium mb-3">Content & Community Lead</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Former journalist and content strategist. Managed knowledge bases for 3 startups 
              through acquisition. Expert at turning complex systems into actionable frameworks.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👩‍💼
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Emma Williams</h3>
            <p className="text-purple-400 font-medium mb-3">Product Designer</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              15+ years designing productivity tools at Apple and Microsoft. Passionate about 
              creating intuitive systems that reduce cognitive load and enhance workflow.
            </p>
          </div>

          {/* Team Member 5 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👨‍🔬
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dr. James Park</h3>
            <p className="text-purple-400 font-medium mb-3">Research & Development</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Data scientist specializing in information retrieval and knowledge graphs. 
              Previously built recommendation systems at a leading AI research lab.
            </p>
          </div>

          {/* Team Member 6 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👩‍💻
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lisa Thompson</h3>
            <p className="text-purple-400 font-medium mb-3">Customer Success Lead</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Former executive coach who's helped 500+ professionals optimize their workflows. 
              Ensures our customers get maximum value from their systems.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Tested, Not Theoretical</h3>
            <p className="text-gray-300">
              Every system we sell has been battle-tested in real-world scenarios. No untested theories 
              or academic fluff—only proven frameworks that deliver results.
            </p>
          </div>

          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="text-xl font-bold text-white mb-2">Science-Backed</h3>
            <p className="text-gray-300">
              Our systems are grounded in cognitive science, learning theory, and behavioral psychology. 
              We don't just follow productivity trends—we understand the science behind what works.
            </p>
          </div>

          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Actionable Over Complex</h3>
            <p className="text-gray-300">
              Complexity is easy. Simplicity is hard. We obsess over making our systems as simple 
              as possible while maintaining their power and effectiveness.
            </p>
          </div>

          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-xl font-bold text-white mb-2">Community-Driven</h3>
            <p className="text-gray-300">
              Our community of 12,000+ knowledge workers constantly helps us improve and evolve 
              our systems. Your feedback shapes everything we create.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-10 text-center">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                12,000+
              </div>
              <p className="text-gray-300 text-sm">Community Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                50,000+
              </div>
              <p className="text-gray-300 text-sm">Systems Deployed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                8+ Years
              </div>
              <p className="text-gray-300 text-sm">Combined Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                4.9/5
              </div>
              <p className="text-gray-300 text-sm">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="bg-charcoal border border-cement rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to Transform Your Thinking?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of knowledge workers who've upgraded their second brain with our battle-tested systems.
          </p>
          <a 
            href="#products" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            Explore Our Systems
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
