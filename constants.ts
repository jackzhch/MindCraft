import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'The Second Brain OS',
    description: 'A comprehensive Notion workspace designed to capture, organize, and distill your digital life. Based on PARA methodology.',
    price: 1.00,
    category: 'System',
    image: 'https://picsum.photos/seed/secondbrain/800/600',
    features: ['Project Tracker', 'Resource Database', 'Quick Capture Dashboard']
  },
  {
    id: 'p2',
    title: 'Focus Framework 2.0',
    description: 'A deep work protocol and planner for high-performers. Includes daily drill templates and distraction-blocking scripts.',
    price: 29.00,
    category: 'Template',
    image: 'https://picsum.photos/seed/focus/800/600',
    features: ['Time Blocking Sheets', 'Energy Audit', 'Ritual Design']
  },
  {
    id: 'p3',
    title: 'Stoic Reflection Journal',
    description: 'Digital journaling templates based on Marcus Aurelius’s nightly reviews. Cultivate resilience and clarity.',
    price: 19.00,
    category: 'Template',
    image: 'https://picsum.photos/seed/stoic/800/600',
    features: ['Morning Prep', 'Evening Review', 'Value Tracking']
  },
  {
    id: 'p4',
    title: 'Zettelkasten Mastery Guide',
    description: 'The definitive guide to implementing a slip-box system for networked thought and prolific writing.',
    price: 35.00,
    category: 'Guide',
    image: 'https://picsum.photos/seed/zettel/800/600',
    features: ['Video Walkthroughs', 'Obsidian Vault', 'Reference Manual']
  },
  {
    id: 'p5',
    title: 'Habit Architect',
    description: 'A behavioral science-backed system to build good habits and break bad ones using atomic progression.',
    price: 24.00,
    category: 'System',
    image: 'https://picsum.photos/seed/habit/800/600',
    features: ['Streak Visualization', 'Trigger Mapping', 'Reward System']
  },
  {
    id: 'p6',
    title: 'Cognitive Bias Cheat Sheet',
    description: 'A visual reference aimed at improving decision making by highlighting common mental pitfalls.',
    price: 12.00,
    category: 'Guide',
    image: 'https://picsum.photos/seed/cognitive/800/600',
    features: ['High-Res PDF', 'Flashcards', 'Decision Checklist']
  }
];
