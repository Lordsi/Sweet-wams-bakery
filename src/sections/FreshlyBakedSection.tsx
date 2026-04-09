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
    const headline = headlineRef.current;
    const paragraph = paragraphRef.current;
    const tart = tartRef.current;
    const topRight = topRightRef.current;
    const bottomRight = bottomRightRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !paragraph || !tart || !topRight || !bottomRight || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.9,
        }
      });

      scrollTl
        .fromTo(headline,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(paragraph,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(tart,
          { y: '80vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(topRight,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(bottomRight,
          { x: '50vw', y: '20vh', opacity: 0 },
          { x: 0, y: 0, opacity: 1, ease: 'none' },
          0.15
        )
        .fromTo(cta,
          { y: '-6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.2
        );

      scrollTl
        .fromTo([headline, paragraph],
          { opacity: 1 },
          { opacity: 0, ease: 'power3.inOut' },
          0.7
        )
        .fromTo(tart,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power3.inOut' },
          0.7
        )
        .fromTo(topRight,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power3.inOut' },
          0.7
        )
        .fromTo(bottomRight,
          { x: 0, y: 0, opacity: 1 },
          { x: '10vw', y: '6vh', opacity: 0, ease: 'power3.inOut' },
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-rule relative w-full h-screen bg-paper overflow-hidden z-30"
    >
      {/* Top Left - Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[10vh]"
      >
        <span className="text-xs font-body font-semibold uppercase tracking-[0.14em] text-text-secondary mb-4 block">
          Baked Daily
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-ink leading-[0.95] tracking-tight">
          FRESHLY<br />BAKED
        </h2>
      </div>

      {/* Top Right - Paragraph */}
      <p
        ref={paragraphRef}
        className="absolute left-[56vw] top-[16vh] w-[38vw] max-w-prose text-ink/70 text-base leading-relaxed"
      >
        We start early, work small, and bake until it smells like home. Every pastry is crafted with care using traditional techniques and the finest ingredients.
      </p>

      {/* CTA */}
      <button
        ref={ctaRef}
        type="button"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute left-[56vw] top-[28vh] rounded-md text-taupe hover:underline underline-offset-4 font-medium focus-ring"
      >
        Read our story
      </button>

      {/* Collage Images */}
      <div
        ref={tartRef}
        className="absolute left-[6vw] top-[34vh] w-[44vw] h-[52vh] overflow-hidden rounded-lg"
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
        className="absolute left-[54vw] top-[34vh] w-[40vw] h-[26vh] overflow-hidden rounded-lg"
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
        className="absolute left-[54vw] top-[62vh] w-[40vw] h-[26vh] overflow-hidden rounded-lg"
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
