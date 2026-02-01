import QuranReader from '@/components/QuranReader';
import Hero from '@/components/Hero';
import ProgramsSection from '@/components/ProgramsSection';
import EServicesSection from '@/components/EServicesSection';
// import PremiumScrollAnimation from '@/components/PremiumScrollAnimation';
// import PremiumAnimatedBackground from '@/components/PremiumAnimatedBackground';
// import PremiumFloatingElements from '@/components/PremiumFloatingElements';
import Services from '@/components/Services';
import QuranSection from '@/components/QuranSection';

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="relative z-10">
          <div className="relative">
            <div id="quran-reader">
              <QuranReader />
            </div>
            <div id="hero">
              <Hero />
            </div>
            <div id="programs">
              <ProgramsSection />
            </div>
            <div id="e-services">
              <EServicesSection />
            </div>
            <div id="services">
              <Services />
            </div>
            <div id="quran">
              <QuranSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
