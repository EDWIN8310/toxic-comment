import Hero from '@/components/Hero';
import Demo from '@/components/Demo';
import Features from '@/components/Features';
import Architecture from '@/components/Architecture';
import Metrics from '@/components/Metrics';
import Labels from '@/components/Labels';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Labels />
      <Architecture />
      <Metrics />
      <Footer />
    </main>
  );
}
