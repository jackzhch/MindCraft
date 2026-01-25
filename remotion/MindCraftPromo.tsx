import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig, spring } from 'remotion';

interface MindCraftPromoProps {
  title: string;
  subtitle: string;
}

export const MindCraftPromo: React.FC<MindCraftPromoProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e' }}>
      {/* Scene 1: Opening Title (0-90 frames = 3 seconds) */}
      <Sequence from={0} durationInFrames={90}>
        <OpeningScene title={title} subtitle={subtitle} />
      </Sequence>

      {/* Scene 2: Features Showcase (90-210 frames = 4 seconds) */}
      <Sequence from={90} durationInFrames={120}>
        <FeaturesScene />
      </Sequence>

      {/* Scene 3: Product Showcase (210-330 frames = 4 seconds) */}
      <Sequence from={210} durationInFrames={120}>
        <ProductScene />
      </Sequence>

      {/* Scene 4: Tech Stack (330-390 frames = 2 seconds) */}
      <Sequence from={330} durationInFrames={60}>
        <TechStackScene />
      </Sequence>

      {/* Scene 5: Call to Action (390-450 frames = 2 seconds) */}
      <Sequence from={390} durationInFrames={60}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};

// Opening Scene Component
const OpeningScene: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleY = interpolate(frame, [20, 40], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 'bold',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 20,
          letterSpacing: '-2px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 42,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          color: '#a8b2d1',
          fontWeight: 300,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

// Features Scene Component
const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const features = [
    { icon: '🛒', title: 'E-commerce Platform', desc: 'Modern interface for digital products' },
    { icon: '💳', title: 'Stripe Payments', desc: 'Secure payment processing' },
    { icon: '🔐', title: 'Authentication', desc: 'Supabase Auth integration' },
    { icon: '🤖', title: 'AI Assistant', desc: 'Powered by Google Gemini' },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 60,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Key Features
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          width: '100%',
          maxWidth: 1400,
        }}
      >
        {features.map((feature, index) => {
          const startFrame = 15 + index * 8;
          const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const translateY = interpolate(frame, [startFrame, startFrame + 10], [40, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                padding: 40,
                opacity,
                transform: `translateY(${translateY}px)`,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: 72, marginBottom: 20 }}>{feature.icon}</div>
              <div style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                {feature.title}
              </div>
              <div style={{ fontSize: 20, color: '#a8b2d1' }}>{feature.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Product Scene Component
const ProductScene: React.FC = () => {
  const frame = useCurrentFrame();

  const products = [
    { name: 'The Second Brain OS', price: '$9.00', category: 'System' },
    { name: 'Focus Framework 2.0', price: '$9.00', category: 'Template' },
    { name: 'Stoic Reflection Journal', price: '$19.00', category: 'Template' },
    { name: 'Zettelkasten Mastery', price: '$19.00', category: 'Guide' },
    { name: 'Habit Architect', price: '$29.00', category: 'System' },
    { name: 'Cognitive Bias Cheat Sheet', price: '$29.00', category: 'Guide' },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 50,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Curated Digital Tools
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 30,
          width: '100%',
          maxWidth: 1600,
        }}
      >
        {products.map((product, index) => {
          const startFrame = 15 + index * 5;
          const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const scale = interpolate(frame, [startFrame, startFrame + 10], [0.8, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                padding: 30,
                opacity,
                transform: `scale(${scale})`,
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#7c7c8a',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                  letterSpacing: '1px',
                }}
              >
                {product.category}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: 15,
                  lineHeight: 1.3,
                }}
              >
                {product.name}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: '#9d4edd',
                }}
              >
                {product.price}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Tech Stack Scene Component
const TechStackScene: React.FC = () => {
  const frame = useCurrentFrame();

  const technologies = [
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Stripe',
    'Supabase',
    'Vercel',
    'Google Gemini',
    'Vite',
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 50,
          opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Built with Modern Tech
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 20,
          maxWidth: 1200,
        }}
      >
        {technologies.map((tech, index) => {
          const startFrame = 10 + index * 3;
          const opacity = interpolate(frame, [startFrame, startFrame + 5], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px 40px',
                borderRadius: 50,
                fontSize: 28,
                fontWeight: '600',
                color: 'white',
                opacity,
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {tech}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Call to Action Scene Component
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 30,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        Start Building Your Digital Mind
      </div>
      <div
        style={{
          fontSize: 36,
          color: '#a8b2d1',
          opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Visit mindscraft.com today
      </div>
      <div
        style={{
          marginTop: 50,
          backgroundColor: '#9d4edd',
          padding: '25px 60px',
          borderRadius: 12,
          fontSize: 32,
          fontWeight: 'bold',
          color: 'white',
          opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `scale(${interpolate(frame, [30, 45], [0.9, 1], { extrapolateRight: 'clamp' })})`,
        }}
      >
        Get Started →
      </div>
    </AbsoluteFill>
  );
};

