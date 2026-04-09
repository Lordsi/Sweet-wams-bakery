import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const cakes = [
  {
    id: 'cake-1',
    name: 'Blackforest',
    price: 48,
    image: '/images/exclusive_cake_blackforest.jpg',
    description: 'Rich chocolate layers with cherries and whipped cream',
  },
  {
    id: 'cake-2',
    name: 'Red Velvet',
    price: 52,
    image: '/images/collage_cake_slice_top.jpg',
    description: 'Classic red velvet with cream cheese frosting',
  },
  {
    id: 'cake-3',
    name: 'Vanilla Dream',
    price: 45,
    image: '/images/collage_cake_slice_bottom.jpg',
    description: 'Light vanilla sponge with buttercream',
  },
];

export default function ExclusiveCakesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const dots = dotsRef.current;

    if (!section || !headline || !card || !dots) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.9,
        }
      });

      scrollTl
        .fromTo(headline,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(card,
          { x: '55vw', rotate: 2, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(dots,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.15
        );

      scrollTl
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power3.inOut' },
          0.7
        )
        .fromTo(card,
          { x: 0, rotate: 0, opacity: 1 },
          { x: '22vw', rotate: -2, opacity: 0, ease: 'power3.inOut' },
          0.7
        )
        .fromTo(dots,
          { opacity: 1 },
          { opacity: 0, ease: 'power3.inOut' },
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cakes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cakes.length) % cakes.length);
  };

  const currentCake = cakes[currentIndex];

  const handleAddToCart = () => {
    addItem({
      id: currentCake.id,
      name: currentCake.name,
      price: currentCake.price,
      image: currentCake.image,
      category: 'Cakes',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="cakes"
      className="section-rule relative w-full h-screen bg-paper overflow-hidden z-20"
    >
      {/* Left Content */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[10vh] max-w-[38vw]"
      >
        <span className="text-xs font-body font-semibold uppercase tracking-[0.14em] text-text-secondary mb-4 block">
          Most Popular
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-ink leading-[0.95] tracking-tight mb-8">
          OUR EXCLUSIVE<br />CAKES
        </h2>
        <p className="text-ink/70 text-base leading-relaxed max-w-md lg:max-w-[30vw] mb-8">
          From classic layers to modern flavors—each cake is finished by hand and made to order.
        </p>
        <button
          type="button"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-taupe hover:underline underline-offset-4 font-medium rounded-md focus-ring"
        >
          View all cakes
        </button>
      </div>

      {/* Product Card */}
      <div
        ref={cardRef}
        className="absolute left-[56vw] top-[18vh] w-[38vw] h-[64vh] overflow-hidden rounded-lg border border-ink/10 bg-white shadow-elevate-2 animate-float"
      >
        <div className="relative h-[72%] overflow-hidden bg-ink/[0.03]">
          {cakes.map((cake, index) => (
            <img
              key={cake.id}
              src={cake.image}
              alt={cake.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              decoding="async"
            />
          ))}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-md bg-white/90 hover:bg-white flex items-center justify-center transition-colors duration-200 ease-out shadow-sm focus-ring"
          >
            <ChevronLeft className="w-5 h-5 text-ink" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 w-10 h-10 rounded-md bg-white/90 hover:bg-white flex items-center justify-center transition-colors duration-200 ease-out shadow-sm focus-ring"
          >
            <ChevronRight className="w-5 h-5 text-ink" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-xl font-semibold text-ink">
              {currentCake.name}
            </h3>
            <span className="font-display text-xl font-semibold text-taupe">
              ${currentCake.price}
            </span>
          </div>
          <p className="text-text-secondary text-sm mb-4">
            {currentCake.description}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="text-taupe hover:underline underline-offset-4 text-sm font-medium rounded-md focus-ring"
          >
            Order this cake
          </button>
        </div>
      </div>

      {/* Dots */}
      <div
        ref={dotsRef}
        className="absolute top-[86vh] left-[75vw] -translate-x-1/2 flex gap-2"
      >
        {cakes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            type="button"
            className={`h-2 w-2 rounded-full transition-all duration-300 ease-out focus-ring ${
              index === currentIndex ? 'bg-taupe scale-125' : 'bg-ink/20 hover:bg-ink/35'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
