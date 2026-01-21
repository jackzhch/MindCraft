#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 * 
 * This script checks if all required environment variables are properly configured
 * for the MindCraft application to work correctly.
 */

console.log('🔍 Verifying Environment Variables...\n');

const requiredVars = {
  // Stripe Configuration
  'VITE_STRIPE_PUBLISHABLE_KEY': {
    description: 'Stripe publishable key (frontend)',
    pattern: /^pk_(test|live)_[a-zA-Z0-9]+$/,
    required: true,
  },
  'STRIPE_SECRET_KEY': {
    description: 'Stripe secret key (backend)',
    pattern: /^sk_(test|live)_[a-zA-Z0-9]+$/,
    required: true,
  },
  'STRIPE_WEBHOOK_SECRET': {
    description: 'Stripe webhook signing secret',
    pattern: /^whsec_[a-zA-Z0-9]+$/,
    required: true,
  },
  
  // Email Configuration
  'RESEND_API_KEY': {
    description: 'Resend API key for email sending',
    pattern: /^re_[a-zA-Z0-9_]+$/,
    required: true,
  },
  
  // Optional: AI Configuration
  'GEMINI_API_KEY': {
    description: 'Google Gemini API key (optional)',
    pattern: /^[a-zA-Z0-9_-]+$/,
    required: false,
  },
};

let allValid = true;
let missingRequired = [];
let invalidFormat = [];

for (const [key, config] of Object.entries(requiredVars)) {
  const value = process.env[key];
  const status = [];
  
  if (!value) {
    if (config.required) {
      status.push('❌ MISSING (Required)');
      allValid = false;
      missingRequired.push(key);
    } else {
      status.push('⚠️  Not set (Optional)');
    }
  } else if (!config.pattern.test(value)) {
    status.push('❌ INVALID FORMAT');
    allValid = false;
    invalidFormat.push(key);
  } else {
    const maskedValue = value.substring(0, 12) + '...' + value.substring(value.length - 4);
    status.push(`✅ ${maskedValue}`);
  }
  
  console.log(`${key}`);
  console.log(`  ${config.description}`);
  console.log(`  ${status.join(' ')}`);
  console.log('');
}

console.log('\n' + '='.repeat(60) + '\n');

if (allValid) {
  console.log('✅ All required environment variables are properly configured!\n');
  console.log('Your application should work correctly.');
  process.exit(0);
} else {
  console.log('❌ Environment configuration issues detected:\n');
  
  if (missingRequired.length > 0) {
    console.log('Missing required variables:');
    missingRequired.forEach(key => console.log(`  - ${key}`));
    console.log('');
  }
  
  if (invalidFormat.length > 0) {
    console.log('Variables with invalid format:');
    invalidFormat.forEach(key => console.log(`  - ${key}`));
    console.log('');
  }
  
  console.log('Please check the env.example file for correct format.');
  console.log('See WEBHOOK_DEBUG_GUIDE.md for detailed instructions.');
  process.exit(1);
}

