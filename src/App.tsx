import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { SpaceSection } from './components/SpaceSection';
import { Process } from './components/Process';
import { WorkGallery } from './components/WorkGallery';
import { Craftsmanship } from './components/Craftsmanship';
import { Sectors } from './components/Sectors';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { initScrollTracking } from './lib/analytics';

export default function App() {
  useEffect(() => {
    initScrollTracking();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-[12px] focus:uppercase focus:tracking-[0.2em] focus:text-ivory"
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <Philosophy />
        <SpaceSection />
        <Process />
        <WorkGallery />
        <Craftsmanship />
        <Sectors />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
