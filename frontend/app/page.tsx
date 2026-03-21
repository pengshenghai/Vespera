import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import ForWho from '@/components/landing/ForWho';
import Stats from '@/components/landing/Stats';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <ForWho />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
