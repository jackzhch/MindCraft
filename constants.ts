import { Product } from './types';

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
