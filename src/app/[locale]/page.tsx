import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BannerSection from '@/components/BannerSection';
import PrayerTimesBanner from '@/components/PrayerTimesBanner';
import PremiumScrollAnimation from '@/components/PremiumScrollAnimation';
import PremiumAnimatedBackground from '@/components/PremiumAnimatedBackground';
import PremiumFloatingElements from '@/components/PremiumFloatingElements';
import Services from '@/components/Services';
import QuranSection from '@/components/QuranSection';
import LostAndFound from '@/components/LostAndFound';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen pt-14">
        <PremiumAnimatedBackground />
        <PremiumFloatingElements />
        <div className="relative z-10">
          <PrayerTimesBanner />
          <div className="relative">
            <Navbar />
            <PremiumScrollAnimation direction="up" delay={0.1} intensity={1.2}>
              <Hero />
            </PremiumScrollAnimation>
            <PremiumScrollAnimation direction="scale" delay={0.2} intensity={0.8}>
              <BannerSection />
            </PremiumScrollAnimation>
            <PremiumScrollAnimation direction="left" delay={0.3} intensity={0.9}>
              <Services />
            </PremiumScrollAnimation>
            <PremiumScrollAnimation direction="right" delay={0.4} intensity={0.9}>
              <QuranSection />
            </PremiumScrollAnimation>
            <PremiumScrollAnimation direction="rotate" delay={0.5} intensity={0.7}>
              <LostAndFound />
            </PremiumScrollAnimation>
            <PremiumScrollAnimation direction="up" delay={0.6} intensity={0.8}>
              <Footer />
            </PremiumScrollAnimation>
          </div>
        </div>
      </div>
    </>
  );
}
