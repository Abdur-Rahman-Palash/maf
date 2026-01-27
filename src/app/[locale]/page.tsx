import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BannerSection from '@/components/BannerSection';
import ProgramsSection from '@/components/ProgramsSection';
import EServicesSection from '@/components/EServicesSection';
import PremiumScrollAnimation from '@/components/PremiumScrollAnimation';
import PremiumAnimatedBackground from '@/components/PremiumAnimatedBackground';
import PremiumFloatingElements from '@/components/PremiumFloatingElements';
import Services from '@/components/Services';
import QuranSection from '@/components/QuranSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* <PremiumAnimatedBackground />
        <PremiumFloatingElements /> */}
        <div className="relative z-10">
          <div className="relative">
            <Header />
            <div id="hero">
              <PremiumScrollAnimation direction="up" delay={0.1} intensity={1.2}>
                <Hero />
              </PremiumScrollAnimation>
            </div>
            <div id="banner">
              <PremiumScrollAnimation direction="scale" delay={0.2} intensity={0.8}>
                <BannerSection />
              </PremiumScrollAnimation>
            </div>
            <div id="programs">
              <PremiumScrollAnimation direction="left" delay={0.3} intensity={0.9}>
                <ProgramsSection />
              </PremiumScrollAnimation>
            </div>
            <div id="e-services">
              <PremiumScrollAnimation direction="right" delay={0.4} intensity={0.9}>
                <EServicesSection />
              </PremiumScrollAnimation>
            </div>
            <div id="services">
              <PremiumScrollAnimation direction="up" delay={0.5} intensity={0.8}>
                <Services />
              </PremiumScrollAnimation>
            </div>
            <div id="quran">
              <PremiumScrollAnimation direction="right" delay={0.4} intensity={0.9}>
                <QuranSection />
              </PremiumScrollAnimation>
            </div>
            <PremiumScrollAnimation direction="up" delay={0.5} intensity={0.8}>
              <Footer />
            </PremiumScrollAnimation>
          </div>
        </div>
      </div>
    </>
  );
}
