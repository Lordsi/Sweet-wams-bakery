import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const image = imageRef.current;
      const content = contentRef.current;

      if (!image || !content) return;

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
            image,
            { x: '-60vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          )
          .fromTo(
            [label, headline],
            { x: '40vw', opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
            0.05
          )
          .fromTo(
            paragraph,
            { y: '10vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.1
          )
          .fromTo(
            cta,
            { y: '6vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.15
          );

        scrollTl
          .fromTo(
            image,
            { x: 0, opacity: 1 },
            { x: '-18vw', opacity: 0, ease: 'power3.inOut' },
            0.7
          )
          .fromTo(
            content,
            { x: 0, opacity: 1 },
            { x: '12vw', opacity: 0, ease: 'power3.inOut' },
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
      id="about"
      className="section-rule relative w-full bg-paper z-50 md:h-screen md:overflow-hidden"
    >
      {/* Left Image */}
      <div
        ref={imageRef}
        className="relative w-full h-56 sm:h-80 md:absolute md:left-0 md:top-0 md:w-1/2 md:h-full shrink-0"
      >
        <img
          src="/images/about_baker_portrait.jpg"
          alt="Our baker"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div
        ref={contentRef}
        className="relative w-full flex flex-col justify-center px-4 py-12 md:absolute md:right-0 md:top-0 md:w-1/2 md:h-full md:px-[8vw] md:py-0"
      >
        <span className="micro-label text-xs font-body font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-text-secondary mb-4">
          About Us
        </span>
        <h2 className="headline font-display text-[clamp(1.65rem,5vw,3.5rem)] font-bold text-ink leading-[1.05] md:leading-[0.95] tracking-tight mb-6 md:mb-8 text-balance">
          WE ARE TOP
          <br />
          HOME BAKERS
        </h2>
        <p className="paragraph max-w-prose text-ink/70 text-base leading-relaxed mb-8 text-pretty">
          A small team with a big love for butter, sugar, and honest craftsmanship. Every recipe has been perfected over years of passion and dedication to the art of baking.
        </p>
        <button
          type="button"
          onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          className="cta rounded-md text-taupe-dark hover:underline underline-offset-4 font-medium w-fit focus-ring"
        >
          Meet the team
        </button>
      </div>
    </section>
  );
}
