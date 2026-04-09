import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FreshlyBakedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const tartRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const headline = headlineRef.current;
      const paragraph = paragraphRef.current;
      const tart = tartRef.current;
      const topRight = topRightRef.current;
      const bottomRight = bottomRightRef.current;
      const cta = ctaRef.current;

      if (!headline || !paragraph || !tart || !topRight || !bottomRight || !cta) return;

      const ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.9,
          },
        });

        scrollTl
          .fromTo(
            headline,
            { x: '-40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          )
          .fromTo(
            paragraph,
            { x: '40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.05
          )
          .fromTo(
            tart,
            { y: '80vh', scale: 0.92, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, ease: 'none' },
            0.05
          )
          .fromTo(
            topRight,
            { x: '50vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.1
          )
          .fromTo(
            bottomRight,
            { x: '50vw', y: '20vh', opacity: 0 },
            { x: 0, y: 0, opacity: 1, ease: 'none' },
            0.15
          )
          .fromTo(
            cta,
            { y: '-6vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.2
          );

        scrollTl
          .fromTo(
            [headline, paragraph],
            { opacity: 1 },
            { opacity: 0, ease: 'power3.inOut' },
            0.7
          )
          .fromTo(
            tart,
            { x: 0, opacity: 1 },
            { x: '-10vw', opacity: 0, ease: 'power3.inOut' },
            0.7
          )
          .fromTo(
            topRight,
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power3.inOut' },
            0.7
          )
          .fromTo(
            bottomRight,
            { x: 0, y: 0, opacity: 1 },
            { x: '10vw', y: '6vh', opacity: 0, ease: 'power3.inOut' },
            0.75
          );
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-rule relative w-full bg-paper z-30 py-16 px-4 sm:px-6 md:px-0 md:py-0 md:h-screen md:overflow-hidden"
    >
      {/* Top Left - Headline */}
      <div
        ref={headlineRef}
        className="relative w-full max-w-xl md:absolute md:left-[6vw] md:top-[10vh] md:max-w-[38vw] mb-6 md:mb-0"
      >
        <span className="text-xs font-body font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-text-secondary mb-3 sm:mb-4 block">
          Baked Daily
        </span>
        <h2 className="font-display text-[clamp(1.65rem,6vw,4.5rem)] font-bold text-ink leading-[1.05] md:leading-[0.95] tracking-tight text-balance">
          FRESHLY
          <br />
          BAKED
        </h2>
      </div>

      {/* Top Right - Paragraph */}
      <p
        ref={paragraphRef}
        className="relative w-full max-w-prose text-ink/70 text-base leading-relaxed mb-4 md:mb-0 md:absolute md:left-[56vw] md:top-[16vh] md:w-[38vw] text-pretty"
      >
        We start early, work small, and bake until it smells like home. Every pastry is crafted with care using traditional techniques and the finest ingredients.
      </p>

      {/* CTA */}
      <button
        ref={ctaRef}
        type="button"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="relative mb-8 md:mb-0 md:absolute md:left-[56vw] md:top-[28vh] rounded-md text-taupe-dark hover:underline underline-offset-4 font-medium focus-ring"
      >
        Read our story
      </button>

      {/* Collage Images */}
      <div
        ref={tartRef}
        className="relative w-full h-56 sm:h-72 rounded-lg overflow-hidden mb-4 md:mb-0 md:absolute md:left-[6vw] md:top-[34vh] md:w-[44vw] md:h-[52vh]"
      >
        <img
          src="/images/collage_tart_slice.jpg"
          alt="Fresh fruit tart"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        ref={topRightRef}
        className="relative w-full h-40 sm:h-44 rounded-lg overflow-hidden mb-4 md:mb-0 md:absolute md:left-[54vw] md:top-[34vh] md:w-[40vw] md:h-[26vh]"
      >
        <img
          src="/images/collage_cake_slice_top.jpg"
          alt="Cake slice with berries"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        ref={bottomRightRef}
        className="relative w-full h-40 sm:h-44 rounded-lg overflow-hidden md:absolute md:left-[54vw] md:top-[62vh] md:w-[40vw] md:h-[26vh]"
      >
        <img
          src="/images/collage_cake_slice_bottom.jpg"
          alt="Layered cake slice"
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
