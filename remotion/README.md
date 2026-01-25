# MindCraft Promotional Video

A professional promotional video showcasing the MindCraft platform, built with [Remotion](https://www.remotion.dev/).

## Video Overview

**Duration:** 15 seconds (450 frames at 30 fps)  
**Resolution:** 1920x1080 (Full HD)  
**Format:** MP4

### Scenes

1. **Opening (0-3s)**: Animated title and subtitle with gradient background
2. **Features (3-7s)**: Grid showcase of key features with icons
3. **Products (7-11s)**: Curated digital products with pricing
4. **Tech Stack (11-13s)**: Technologies powering the platform
5. **Call to Action (13-15s)**: Encouraging users to get started

## Features

✨ **Smooth Animations**: Spring-based animations using Remotion's physics engine  
🎨 **Modern Design**: Matches MindCraft's dark theme and brand colors  
🔄 **Professional Transitions**: Fade-ins, scale animations, and staggered entries  
📱 **Responsive**: Optimized for 1920x1080 resolution

## Usage

### Preview the Video

To open the Remotion Studio and preview the video:

```bash
npm run remotion:studio
```

This will open an interactive preview where you can:
- Scrub through the timeline
- Adjust the composition properties
- See real-time updates
- Export individual frames

### Render the Video

To render the final video to MP4:

```bash
npm run remotion:render
```

This will create `mindcraft-promo.mp4` in the project root.

### Advanced Rendering

For more control over the output:

```bash
# Render with higher quality
npx remotion render remotion/index.ts MindCraftPromo output.mp4 --codec h264 --quality 90

# Render as GIF
npx remotion render remotion/index.ts MindCraftPromo output.gif

# Render specific frame range
npx remotion render remotion/index.ts MindCraftPromo output.mp4 --frames=0-150

# Render as PNG sequence
npx remotion render remotion/index.ts MindCraftPromo out
```

## Customization

You can customize the video by editing `remotion/MindCraftPromo.tsx`:

- **Duration**: Change `durationInFrames` in `Root.tsx`
- **Colors**: Update the gradient backgrounds in each scene
- **Content**: Modify the features, products, or tech stack arrays
- **Animations**: Adjust the interpolation values and spring configs
- **Text**: Update props in `Root.tsx` or directly in components

## Project Structure

```
remotion/
├── index.ts              # Entry point - registers the root
├── Root.tsx              # Defines all compositions
├── MindCraftPromo.tsx    # Main promotional video component
└── README.md             # This file
```

## Requirements

- Node.js 16+
- Remotion 4.0.399+
- React 19+

## Learn More

- [Remotion Documentation](https://www.remotion.dev/docs/)
- [Remotion Animations](https://www.remotion.dev/docs/animating-properties)
- [Remotion Transitions](https://www.remotion.dev/docs/transitions)

## Notes

The video uses:
- Linear interpolations for smooth fade effects
- Spring animations for bouncy, natural movements
- Gradient backgrounds matching MindCraft's brand
- Staggered animations for visual interest
- Clean, modern typography

Built with ❤️ for MindCraft

