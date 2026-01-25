# Masjid Salman al Farsi Clone

A pixel-perfect, high-performance clone of the Masjid Salman al Farsi website using Next.js 15+, Tailwind CSS v4, and premium animations.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with RTL support)
- **Animations:** 
  - Framer Motion v11 (UI interactions)
  - GSAP v3.12 (ScrollTrigger, complex sequences)
  - Lenis (Smooth scrolling)
  - tsParticles (Hero effects)
  - Vanilla-tilt (3D card hover)
- **I18n:** Next-Intl (English & Arabic)
- **Audio:** Wavesurfer.js (Quran recitations)
- **Sliders:** Swiper v11

## Features

- **Responsive Design:** Mobile-first approach with burger menu.
- **RTL Support:** Full Arabic support with `dir="rtl"`.
- **Premium Animations:** Parallax hero, scroll-triggered reveals, smooth scrolling.
- **Architecture Tour:** Immersive scrolling experience for mosque details.
- **Audio Player:** Waveform visualization for Quran recitations.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open in browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and configure settings
   - Click "Deploy" - your site will be live in minutes

3. **Environment Variables (Optional):**
   Create `.env.local` for any environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

### Manual Build

```bash
npm run build
npm start
```

## Project Structure

- `src/app/[locale]`: Localized pages (App Router).
- `src/components`: Reusable UI components.
- `messages`: Translation files (en.json, ar.json).
- `src/i18n`: Next-Intl configuration.

## License

MIT
