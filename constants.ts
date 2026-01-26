import { Product, Bundle, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'The Second Brain OS',
    description: 'Never forget an idea again. This battle-tested PARA workspace captures every insight, organizes your entire digital life, and surfaces the right knowledge exactly when you need it. Used by 10,000+ knowledge workers.',
    price: 9.00,
    category: 'System',
    image: 'https://picsum.photos/seed/secondbrain/800/600',
    features: ['Project Tracker', 'Resource Database', 'Quick Capture Dashboard']
  },
  {
    id: 'p2',
    title: 'Focus Framework 2.0',
    description: 'Reclaim 15+ hours weekly. This proven deep work system eliminates distractions and multiplies your output. Includes time-blocking templates that top performers pay $1000+ for in coaching sessions.',
    price: 9.00,
    category: 'Template',
    image: 'https://picsum.photos/seed/focus/800/600',
    features: ['Time Blocking Sheets', 'Energy Audit', 'Ritual Design']
  },
  {
    id: 'p3',
    title: 'Stoic Reflection Journal',
    description: 'Build unshakeable mental strength in just 10 minutes daily. Based on the ancient wisdom of Marcus Aurelius, this journaling system helps you navigate chaos, make better decisions, and find meaning in everyday life.',
    price: 19.00,
    category: 'Template',
    image: 'https://picsum.photos/seed/stoic/800/600',
    features: ['Morning Prep', 'Evening Review', 'Value Tracking']
  },
  {
    id: 'p4',
    title: 'Zettelkasten Mastery Guide',
    description: 'Write 10x faster with a thinking system used by history\'s most prolific authors. Transform scattered notes into a powerful idea engine that generates insights while you sleep. Includes plug-and-play Obsidian vault.',
    price: 19.00,
    category: 'Guide',
    image: 'https://picsum.photos/seed/zettel/800/600',
    features: ['Video Walkthroughs', 'Obsidian Vault', 'Reference Manual']
  },
  {
    id: 'p5',
    title: 'Habit Architect',
    description: 'Finally stick to your habits. This neuroscience-backed system makes behavior change effortless through micro-commitments and visible progress. Join 5,000+ people who\'ve transformed their lives one tiny habit at a time.',
    price: 29.00,
    category: 'System',
    image: 'https://picsum.photos/seed/habit/800/600',
    features: ['Streak Visualization', 'Trigger Mapping', 'Reward System']
  },
  {
    id: 'p6',
    title: 'Cognitive Bias Cheat Sheet',
    description: 'Stop making expensive mental mistakes. This beautifully designed reference exposes the hidden patterns sabotaging your decisions. One insight could save you thousands in bad choices—business, investment, or life.',
    price: 29.00,
    category: 'Guide',
    image: 'https://picsum.photos/seed/cognitive/800/600',
    features: ['High-Res PDF', 'Flashcards', 'Decision Checklist']
  }
];

// Product Bundles
export const BUNDLES: Bundle[] = [
  {
    id: 'bundle1',
    title: 'The Complete Knowledge Stack',
    description: '⚡ Get our 3 most popular systems together and save $8. Everything you need to transform scattered information into a powerful thinking machine. Perfect for serious knowledge workers.',
    productIds: ['p1', 'p2', 'p4'],
    price: 29.00,
    originalPrice: 37.00,
    savings: 8.00,
    image: 'https://picsum.photos/seed/bundle/800/600',
    features: [
      'Second Brain OS - PARA workspace',
      'Focus Framework 2.0 - Deep work system', 
      'Zettelkasten Mastery Guide - Complete course',
      '🎁 Bonus: Integration guide ($19 value)',
      '💎 Save $8 vs. buying separately'
    ]
  }
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'Google',
    image: 'https://i.pravatar.cc/150?img=1',
    text: 'The Second Brain OS helped me organize 5 years of scattered notes in just one weekend. I finally feel in control of my knowledge. Worth every penny.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Marcus Rodriguez',
    role: 'Engineering Lead',
    company: 'Stripe',
    image: 'https://i.pravatar.cc/150?img=12',
    text: 'Focus Framework 2.0 helped me reclaim 12+ hours weekly. My team noticed the difference immediately. Best $9 I ever spent on productivity.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Emily Watson',
    role: 'UX Designer',
    company: 'Figma',
    image: 'https://i.pravatar.cc/150?img=5',
    text: 'The Zettelkasten guide transformed how I connect ideas. I went from 0 to 500 interconnected notes in 3 months. My creativity has never been higher.',
    rating: 5
  },
  {
    id: 't4',
    name: 'David Kim',
    role: 'Startup Founder',
    company: 'TechVentures',
    image: 'https://i.pravatar.cc/150?img=8',
    text: 'Bought the Complete Stack and it paid for itself in saved time within 48 hours. These aren\'t just templates—they\'re thinking systems that actually work.',
    rating: 5
  },
  {
    id: 't5',
    name: 'Priya Patel',
    role: 'Content Strategist',
    company: 'Netflix',
    image: 'https://i.pravatar.cc/150?img=9',
    text: 'The Stoic Journal changed my life. 10 minutes of daily reflection has given me more clarity than years of therapy. Highly recommend.',
    rating: 5
  }
];
