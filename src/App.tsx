import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import HeroSection from './sections/HeroSection';
import ExclusiveCakesSection from './sections/ExclusiveCakesSection';
import FreshlyBakedSection from './sections/FreshlyBakedSection';
import ProductGridSection from './sections/ProductGridSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import CustomCakeSection from './sections/CustomCakeSection';
import CustomOrderSection from './sections/CustomOrderSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({ anticipatePin: 1 });

const buns = [
  { id: 'bun-1', name: 'Cinnamon Bun', price: 5, image: '/images/product_bun_01.jpg' },
  { id: 'bun-2', name: 'Glazed Bun', price: 4, image: '/images/product_bun_02.jpg' },
  { id: 'bun-3', name: 'Berry Bun', price: 5, image: '/images/product_bun_03.jpg' },
];

const croissants = [
  { id: 'croissant-1', name: 'Butter Croissant', price: 4, image: '/images/product_croissant_01.jpg' },
  { id: 'croissant-2', name: 'Almond Croissant', price: 5, image: '/images/product_croissant_02.jpg' },
  { id: 'croissant-3', name: 'Chocolate Croissant', price: 5, image: '/images/product_croissant_03.jpg' },
];

const bread = [
  { id: 'bread-1', name: 'Sourdough Loaf', price: 7, image: '/images/product_bread_01.jpg' },
  { id: 'bread-2', name: 'Baguette', price: 4, image: '/images/product_bread_02.jpg' },
  { id: 'bread-3', name: 'Multigrain', price: 8, image: '/images/product_bread_03.jpg' },
];

const donuts = [
  { id: 'donut-1', name: 'Glazed Donut', price: 3, image: '/images/product_donut_01.jpg' },
  { id: 'donut-2', name: 'Chocolate Donut', price: 4, image: '/images/product_donut_02.jpg' },
  { id: 'donut-3', name: 'Berry Donut', price: 4, image: '/images/product_donut_03.jpg' },
];

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.22, max: 0.55 },
          delay: 0,
          ease: 'power3.inOut',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative">
        <div className="grain-overlay" />
        <Navigation />
        <CartDrawer />
        <main className="relative">
          <HeroSection />
          <ExclusiveCakesSection />
          <FreshlyBakedSection />
          <ProductGridSection
            id="buns"
            microLabel="NEW"
            title="TASTY BUNS"
            ctaText="View all buns"
            products={buns}
          />
          <AboutSection />
          <ProductGridSection
            id="croissants"
            microLabel="FRESH EVERY MORNING"
            title="DELICIOUS CROISSANTS"
            ctaText="View all croissants"
            products={croissants}
          />
          <ServicesSection />
          <ProductGridSection
            id="bread"
            microLabel="DAILY LOAVES"
            title="FRESH BREAD"
            ctaText="View all bread"
            products={bread}
          />
          <CustomCakeSection />
          <ProductGridSection
            id="donuts"
            microLabel="SWEET TREATS"
            title="SWEET DONUTS"
            ctaText="View all donuts"
            products={donuts}
          />
          <CustomOrderSection />
          <ContactSection />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
