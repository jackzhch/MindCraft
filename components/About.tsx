import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
          {t.about.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">MindsCraft</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="bg-charcoal border border-cement rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">{t.about.missionTitle}</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            {t.about.missionText1}
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            {t.about.missionText2}
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">{t.about.teamTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👨‍💻
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.team.alex.name}</h3>
            <p className="text-purple-400 font-medium mb-3">{t.about.team.alex.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.about.team.alex.description}
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👩‍🎓
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.team.sarah.name}</h3>
            <p className="text-purple-400 font-medium mb-3">{t.about.team.sarah.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.about.team.sarah.description}
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👨‍🏫
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.team.marcus.name}</h3>
            <p className="text-purple-400 font-medium mb-3">{t.about.team.marcus.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.about.team.marcus.description}
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👩‍💼
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.team.emma.name}</h3>
            <p className="text-purple-400 font-medium mb-3">{t.about.team.emma.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.about.team.emma.description}
            </p>
          </div>

          {/* Team Member 5 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👨‍🔬
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.team.james.name}</h3>
            <p className="text-purple-400 font-medium mb-3">{t.about.team.james.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.about.team.james.description}
            </p>
          </div>

          {/* Team Member 6 */}
          <div className="bg-charcoal border border-cement rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center text-3xl mb-4">
              👩‍💻
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.team.lisa.name}</h3>
            <p className="text-purple-400 font-medium mb-3">{t.about.team.lisa.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.about.team.lisa.description}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif font-bold text-white mb-12 text-center">{t.about.valuesTitle}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.values.tested.title}</h3>
            <p className="text-gray-300">
              {t.about.values.tested.description}
            </p>
          </div>

          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.values.science.title}</h3>
            <p className="text-gray-300">
              {t.about.values.science.description}
            </p>
          </div>

          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.values.actionable.title}</h3>
            <p className="text-gray-300">
              {t.about.values.actionable.description}
            </p>
          </div>

          <div className="bg-charcoal border border-cement rounded-xl p-6">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-xl font-bold text-white mb-2">{t.about.values.community.title}</h3>
            <p className="text-gray-300">
              {t.about.values.community.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-10 text-center">{t.about.statsTitle}</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                12,000+
              </div>
              <p className="text-gray-300 text-sm">{t.about.statsCommunity}</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                50,000+
              </div>
              <p className="text-gray-300 text-sm">{t.about.statsSystems}</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                8+
              </div>
              <p className="text-gray-300 text-sm">{t.about.statsExperience}</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                4.9/5
              </div>
              <p className="text-gray-300 text-sm">{t.about.statsRating}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <div className="bg-charcoal border border-cement rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">{t.about.ctaTitle}</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.about.ctaDescription}
          </p>
          <a 
            href="#products" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            {t.about.ctaButton}
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
