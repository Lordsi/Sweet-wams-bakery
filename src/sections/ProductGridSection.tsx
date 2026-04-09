import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  inStock?: boolean;
}

interface ProductGridSectionProps {
  id: string;
  microLabel: string;
  title: string;
  ctaText: string;
  products: Product[];
}

export default function ProductGridSection({
  id,
  microLabel,
  title,
  ctaText,
  products,
}: ProductGridSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cardElements = cards.querySelectorAll('.product-card');
      gsap.fromTo(
        cardElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const images = cards.querySelectorAll('.product-image');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { y: -12 },
          {
            y: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.75,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-rule relative w-full bg-paper py-20 lg:py-28 z-40"
    >
      <div className="px-[6vw]">
        <div ref={headerRef} className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-body font-semibold uppercase tracking-[0.14em] text-text-secondary mb-3 block">
              {microLabel}
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-ink leading-[0.95] tracking-tight">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="hidden sm:inline-flex text-taupe-dark hover:underline underline-offset-4 font-medium rounded-md px-1 focus-ring"
          >
            {ctaText}
          </button>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              category={title}
              inStock={product.inStock ?? true}
              onAddToCart={(p, quantity) => {
                addItem(
                  {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    category: p.category ?? title,
                  },
                  quantity
                );
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="btn-secondary sm:hidden mt-8 w-full"
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
}
