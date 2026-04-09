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
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

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
        .fromTo(image,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo([label, headline],
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.05
        )
        .fromTo(paragraph,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(cta,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.15
        );

      scrollTl
        .fromTo(image,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power3.inOut' },
          0.7
        )
        .fromTo(content,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power3.inOut' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-rule relative w-full h-screen bg-paper overflow-hidden z-50"
    >
      {/* Left Image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-1/2 h-full"
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
        className="absolute right-0 top-0 w-1/2 h-full flex flex-col justify-center px-[8vw]"
      >
        <span className="micro-label text-xs font-body font-semibold uppercase tracking-[0.14em] text-text-secondary mb-4">
          About Us
        </span>
        <h2 className="headline font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-ink leading-[0.95] tracking-tight mb-8">
          WE ARE TOP<br />HOME BAKERS
        </h2>
        <p className="paragraph max-w-prose text-ink/70 text-base leading-relaxed mb-8">
          A small team with a big love for butter, sugar, and honest craftsmanship. Every recipe has been perfected over years of passion and dedication to the art of baking.
        </p>
        <button
          type="button"
          onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          className="cta rounded-md text-taupe hover:underline underline-offset-4 font-medium w-fit focus-ring"
        >
          Meet the team
        </button>
      </div>
    </section>
  );
}
