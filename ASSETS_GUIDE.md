# Asset Generation Guide

This file provides instructions for creating the required image assets for MindsCraft.

## Required Images

### 1. Social Media Preview Images

#### Open Graph Image
- **Filename**: `og-image.jpg`
- **Size**: 1200 x 630 pixels
- **Format**: JPG or PNG
- **Location**: `/public/og-image.jpg`
- **Used for**: Facebook, LinkedIn, Discord, WhatsApp previews

#### Twitter Card Image
- **Filename**: `twitter-image.jpg`
- **Size**: 1200 x 628 pixels
- **Format**: JPG or PNG
- **Location**: `/public/twitter-image.jpg`
- **Used for**: Twitter/X card previews

**Design Recommendations**:
- Include the MindsCraft logo
- Use the brand colors (purple #8b5cf6, dark #0f0f11)
- Include tagline: "Digital Architectures for Thought"
- Keep text large and readable
- Test on different backgrounds (light/dark)

### 2. Favicon Files

You can generate all favicon files using these online tools:
- [Favicon.io](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

#### Required Favicon Files:
- `favicon-16x16.png` (16 x 16 pixels)
- `favicon-32x32.png` (32 x 32 pixels)
- `apple-touch-icon.png` (180 x 180 pixels)
- `android-chrome-192x192.png` (192 x 192 pixels)
- `android-chrome-512x512.png` (512 x 512 pixels)

**All files location**: `/public/`

### 3. Logo File

- **Filename**: `logo.png`
- **Size**: 512 x 512 pixels (square)
- **Format**: PNG with transparency
- **Location**: `/public/logo.png`
- **Used for**: Structured data, branding

## Quick Generation with Online Tools

### Method 1: Use Canva (Free)

1. Go to [Canva.com](https://www.canva.com/)
2. Create a design with dimensions 1200 x 630
3. Use brand colors and add text
4. Download as JPG
5. Repeat for Twitter dimensions (1200 x 628)

### Method 2: Use Figma (Free)

1. Open [Figma.com](https://www.figma.com/)
2. Create frames: 1200 x 630 and 1200 x 628
3. Design with brand elements
4. Export as PNG or JPG

### Method 3: Use Favicon Generator

1. Go to [Favicon.io](https://favicon.io/) or [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo or use the text generator
3. Download the generated package
4. Extract files to `/public/` folder

## Current Status

✅ `favicon.svg` - Simple placeholder created (letter "M")
⚠️ `og-image.jpg` - Needs to be created
⚠️ `twitter-image.jpg` - Needs to be created
⚠️ `favicon-16x16.png` - Needs to be generated
⚠️ `favicon-32x32.png` - Needs to be generated
⚠️ `apple-touch-icon.png` - Needs to be generated
⚠️ `android-chrome-192x192.png` - Needs to be generated
⚠️ `android-chrome-512x512.png` - Needs to be generated
⚠️ `logo.png` - Needs to be created

## Design Specifications

### Brand Colors
- **Primary Purple**: `#8b5cf6`
- **Dark Purple**: `#6d28d9`
- **Obsidian (Background)**: `#0f0f11`
- **Charcoal**: `#18181b`
- **Paper (Text)**: `#e4e4e7`

### Typography
- **Sans-serif**: Inter
- **Serif**: Playfair Display

### Logo Design Ideas
- Use the letter "M" as the primary element
- Incorporate geometric shapes representing "architecture of thought"
- Use gradient from primary to dark purple
- Keep it minimal and modern

## Testing After Asset Creation

Once you've created the assets:

1. **Test social sharing**:
   ```bash
   # Facebook
   https://developers.facebook.com/tools/debug/?q=https://mindscraft.vercel.app
   
   # Twitter
   https://cards-dev.twitter.com/validator
   ```

2. **Verify favicon appears** in browser tabs

3. **Check mobile home screen icon** on iOS/Android

4. **Validate images load** by visiting URLs directly:
   - https://mindscraft.vercel.app/og-image.jpg
   - https://mindscraft.vercel.app/twitter-image.jpg
   - https://mindscraft.vercel.app/favicon.svg

## Automated Generation (Advanced)

If you want to automate this process, you can use:

### Node.js Scripts
- `sharp` - Image processing library
- `puppeteer` - Screenshot generation
- `@vercel/og` - Dynamic OG image generation

### Example package.json script:
```json
{
  "scripts": {
    "generate-assets": "node scripts/generate-assets.js"
  }
}
```

---

**Note**: The current SVG favicon is a simple placeholder. For production use, it's recommended to create professional PNG favicons and social media images that represent your brand identity.

