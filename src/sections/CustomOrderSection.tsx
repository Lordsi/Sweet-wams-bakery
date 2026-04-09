import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CustomOrderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const content = contentRef.current;
      const image = imageRef.current;

      if (!content || !image) return;

      const ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.9,
          },
        });

        const label = content.querySelector('.micro-label');
        const headline = content.querySelector('.headline');
        const paragraph = content.querySelector('.paragraph');
        const cta = content.querySelector('.cta');

        scrollTl
          .fromTo(
            [label, headline],
            { x: '-50vw', opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
            0
          )
          .fromTo(
            [paragraph, cta],
            { y: '10vh', opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
            0.1
          )
          .fromTo(
            image,
            { x: '60vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.05
          );

        scrollTl
          .fromTo(
            content,
            { x: 0, opacity: 1 },
            { x: '-14vw', opacity: 0, ease: 'power3.inOut' },
            0.7
          )
          .fromTo(
            image,
            { x: 0, opacity: 1 },
            { x: '14vw', opacity: 0, ease: 'power3.inOut' },
            0.7
          );
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-rule relative flex flex-col md:block w-full bg-paper z-[80] md:h-screen md:overflow-hidden"
    >
      {/* Left Content */}
      <div
        ref={contentRef}
        className="relative w-full flex flex-col justify-center px-4 py-12 md:absolute md:left-0 md:top-0 md:w-1/2 md:h-full md:px-[6vw] md:py-0 order-2 md:order-none"
      >
        <span className="micro-label text-xs font-body font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-text-secondary mb-4">
          Custom Order
        </span>
        <h2 className="headline font-display text-[clamp(1.65rem,5vw,3.5rem)] font-bold text-ink leading-[1.05] md:leading-[0.95] tracking-tight mb-6 md:mb-8 text-balance">
          WE BAKE WHAT
          <br />
          YOU WANT
        </h2>
        <p className="paragraph max-w-prose text-ink/70 text-base leading-relaxed mb-8 text-pretty">
          Birthdays, weddings, or just because—tell us the date and we'll handle the rest. Every occasion deserves something sweet.
        </p>
        <button
          type="button"
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="cta rounded-md text-taupe-dark hover:underline underline-offset-4 font-medium w-fit focus-ring"
        >
          Start an order
        </button>
      </div>

      {/* Right Image */}
      <div
        ref={imageRef}
        className="relative w-full h-56 sm:h-80 md:absolute md:right-0 md:top-0 md:w-1/2 md:h-full order-1 md:order-none shrink-0"
      >
        <img
          src="/images/custom_order_pastry_box.jpg"
          alt="Pastry box"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
