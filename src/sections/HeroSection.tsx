import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !label || !headline || !subhead || !cta) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      loadTl
        .fromTo(
          image,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 }
        )
        .fromTo(
          label,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.2
        )
        .fromTo(
          headline.children,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          0.3
        )
        .fromTo(
          [subhead, cta],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
          0.6
        );

      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.9,
            onLeaveBack: () => {
              gsap.set([image, label, headline, subhead, cta], { clearProps: 'all' });
              loadTl.progress(1);
            },
          },
        });

        scrollTl
          .fromTo(
            headline,
            { x: 0, opacity: 1 },
            { x: '-40vw', opacity: 0, ease: 'power3.inOut' },
            0.7
          )
          .fromTo(
            image,
            { x: 0, scale: 1, opacity: 1 },
            { x: '18vw', scale: 1.06, opacity: 0, ease: 'power3.inOut' },
            0.7
          )
          .fromTo(
            [subhead, cta],
            { y: 0, opacity: 1 },
            { y: '-10vh', opacity: 0, ease: 'power3.inOut' },
            0.75
          );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const element = document.querySelector('#cakes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-ink overflow-hidden z-10"
    >
      <img
        ref={imageRef}
        src="/images/hero_cake_slice.jpg"
        alt="Delicious cake slice with rich frosting"
        className="absolute right-0 top-0 w-full md:w-[48vw] h-[40vh] md:h-full object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />

      <div className="absolute left-0 right-0 md:left-[6vw] md:right-auto top-auto bottom-0 md:bottom-auto md:top-0 h-auto md:h-full flex flex-col justify-end md:justify-center w-full max-w-full md:max-w-[46vw] bg-gradient-to-t md:bg-none from-ink/95 via-ink/85 to-transparent md:from-transparent px-4 pb-10 pt-28 md:p-0 md:pt-0 rounded-t-2xl md:rounded-none">
        <span
          ref={labelRef}
          className="text-xs font-body font-semibold uppercase tracking-[0.14em] text-white/60 mb-4 md:mb-6"
        >
          Artisan Bakery
        </span>

        <div ref={headlineRef} className="space-y-1 sm:space-y-0 mb-6 md:mb-8">
          <h1 className="font-display text-white text-[clamp(1.65rem,9vw,7rem)] md:text-[clamp(2.25rem,7vw,7rem)] font-bold leading-[1.05] md:leading-[0.95] tracking-tight [overflow-wrap:anywhere]">
            DELICIOUS
          </h1>
          <h1 className="font-display text-white text-[clamp(1.65rem,9vw,7rem)] md:text-[clamp(2.25rem,7vw,7rem)] font-bold leading-[1.05] md:leading-[0.95] tracking-tight [overflow-wrap:anywhere]">
            CAKE
          </h1>
          <h1 className="font-display text-white text-[clamp(1.5rem,8vw,7rem)] md:text-[clamp(2.25rem,7vw,7rem)] font-bold leading-[1.05] md:leading-[0.95] tracking-tight [overflow-wrap:anywhere]">
            FOR EVERYONE
          </h1>
        </div>

        <p
          ref={subheadRef}
          className="text-white/80 md:text-white/70 text-sm md:text-base lg:text-lg max-w-lg lg:max-w-xl leading-relaxed mb-6 md:mb-8 text-pretty"
        >
          Handcrafted desserts, baked daily with real ingredients and zero shortcuts.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={scrollToMenu}
            className="btn-primary-on-dark flex items-center justify-center gap-2 group w-full sm:w-auto"
          >
            Explore Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
          </button>
          <button
            type="button"
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="text-white/80 hover:text-white underline underline-offset-4 transition-colors duration-300 ease-out rounded-sm focus-ring-dark text-center py-3 sm:py-0"
          >
            Order Online
          </button>
        </div>
      </div>

      <div className="hidden md:flex absolute left-[6vw] bottom-[6vh] items-center gap-3">
        <div className="w-px h-8 bg-white/30" />
        <span className="text-white/40 text-xs uppercase tracking-wider">Scroll</span>
      </div>
    </section>
  );
}
