# Missing You - Work Bestie Memories

<div align="center">
  <img src="public/smiski1.svg" alt="Missing You Logo" width="120" height="120">
  
  <p><em>A heartfelt video showcase for that one coworker who made work bearable</em></p>
  
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat&logo=framer)](https://www.framer.com/motion/)
  [![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
</div>

## Purpose

Sometimes we forget to thank the people who make our life better just by being in it. This is a tribute to that amazing coworker who actually made work bearable - the one you really wish you could still work with.

## Features

- **Cinematic Experience**: Full-screen video playback with smooth transitions
- **Heartfelt Messages**: Personal notes about workplace friendship and memories
- **Interactive Elements**: Swinging Labubu, glowing Smiski, and animated galleries
- **Video Preloading**: Lag-free experience with background video loading
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Professional Animations**: Physics-like motions and smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 12** - Smooth animations and physics
- **Vite 7** - Lightning-fast development and build

### Infrastructure

- **Azure Blob Storage** - Secure video and asset storage
- **Azure CDN** - Global content delivery network
- **Hot Module Replacement** - Instant development feedback

### Development Tools

- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Static type checking
- **PostCSS** - CSS processing and optimization

## Project Structure

```
src/
├── components/          # React components
│   ├── InitialLoader.tsx    # Loading screen with video preloading
│   ├── IntroSection.tsx     # Hero section with main message
│   ├── MessageSection.tsx   # Workplace memories section
│   ├── SmiskiGif.tsx       # Animated Smiski with trust message
│   ├── SwingingLabubu.tsx  # Physics-based swinging animation
│   ├── AnimatedGallery.tsx # Interactive image gallery
│   └── OutroSection.tsx    # Final thoughts and farewell
├── data/
│   ├── content.json        # Centralized content management
│   └── videos.ts          # Video URLs and metadata
├── hooks/              # Custom React hooks
│   ├── useContent.ts      # Content management hook
│   ├── useVideoManager.ts # Video playback control
│   └── useVideoPreloader.ts # Background video loading
├── types/              # TypeScript definitions
├── utils/              # Helper functions
└── constants/          # App configuration
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd instavideoapp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
```

## Content Management

All content is centralized in `src/data/content.json`:

```json
{
  "videos": {
    "reelsVideos": [...],
    "memoryVideos": [...]
  }
}
```

**To update content:**

1. Edit `src/data/content.json`
2. Modify text, video URLs, or image paths
3. Changes apply instantly across the app

## Deployment

### Azure Infrastructure

- **Blob Storage**: Stores all video files and assets
- **CDN**: Delivers content globally with low latency
- **Static Web Apps**: Hosts the React application

### Build for Production

```bash
npm run build
```

The `dist` folder contains the optimized production build.

## 📱 Device Compatibility

- **Mobile**: iOS Safari 14+, Android Chrome 90+
- **Tablet**: iPad Safari, Android tablets
- **Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🎯 Performance Features

- **Video Preloading**: Background loading during initial screen
- **Intersection Observer**: Videos play only when visible
- **Lazy Loading**: Components load on demand
- **Optimized Assets**: Compressed images and videos
- **CDN Delivery**: Fast global content delivery

## 💝 The Message

_"Sometimes it's not where you work, it's who you work with that makes a job worth going to everyday. We all have that one friend from your old job/project, that we really wish we still work with..."_

## 📄 License

This project is a personal tribute and is not intended for commercial use.

---

<div align="center">
  <p><em>Made with amazing coworker</em></p>
  <p><strong>Embarrassment is an underexplored emotion. Go out there and make a fool of yourself.</strong></p>
</div>
