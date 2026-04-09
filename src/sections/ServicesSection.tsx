import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

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

      const label = content.querySelector('.micro-label');
      const headline = content.querySelector('.headline');
      const paragraph = content.querySelector('.paragraph');
      const cta = content.querySelector('.cta');

      scrollTl
        .fromTo([label, headline],
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0
        )
        .fromTo([paragraph, cta],
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.1
        )
        .fromTo(image,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );

      scrollTl
        .fromTo(content,
          { x: 0, opacity: 1 },
          { x: '-14vw', opacity: 0, ease: 'power3.inOut' },
          0.7
        )
        .fromTo(image,
          { x: 0, opacity: 1 },
          { x: '14vw', opacity: 0, ease: 'power3.inOut' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-rule relative w-full h-screen bg-paper overflow-hidden z-[60]"
    >
      {/* Left Content */}
      <div
        ref={contentRef}
        className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-center px-[6vw]"
      >
        <span className="micro-label text-xs font-body font-semibold uppercase tracking-[0.14em] text-text-secondary mb-4">
          Our Services
        </span>
        <h2 className="headline font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-ink leading-[0.95] tracking-tight mb-8">
          WE BAKE FOR<br />YOU EVERY DAY
        </h2>
        <p className="paragraph max-w-prose text-ink/70 text-base leading-relaxed mb-8">
          Pickup, local delivery, and custom orders for celebrations big and small. We're here to make your sweet dreams come true.
        </p>
        <button
          type="button"
          onClick={() => document.querySelector('#custom')?.scrollIntoView({ behavior: 'smooth' })}
          className="cta rounded-md text-taupe hover:underline underline-offset-4 font-medium w-fit focus-ring"
        >
          See the menu
        </button>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="absolute right-0 top-0 w-1/2 h-full"
      >
        <img
          src="/images/services_kitchen_prep.jpg"
          alt="Kitchen preparation"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
