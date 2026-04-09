import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const footer = footerRef.current;

    if (!section || !heading || !left || !right || !footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(left,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(right,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: right,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-rule relative w-full bg-surface-elevated pt-20 lg:pt-28 pb-0 z-[90]"
    >
      <div className="px-[6vw]">
        <div ref={headingRef} className="mb-12">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-ink leading-[0.95] tracking-tight mb-4">
            VISIT US
          </h2>
          <p className="max-w-prose text-ink/70 text-base">
            Pickup, delivery, and custom orders—Tuesday to Sunday.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div ref={leftRef} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-taupe/12">
                <MapPin className="h-5 w-5 text-taupe" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-ink mb-1">Address</h3>
                <p className="text-ink/70">123 Baker Street, Portland, OR</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-taupe/12">
                <Clock className="h-5 w-5 text-taupe" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-ink mb-1">Hours</h3>
                <p className="text-ink/70">Tue–Sun 7am–6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-taupe/12">
                <Phone className="h-5 w-5 text-taupe" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-ink mb-1">Phone</h3>
                <p className="text-ink/70">(503) 555-0192</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-taupe/12">
                <Mail className="h-5 w-5 text-taupe" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium text-ink mb-1">Email</h3>
                <p className="text-ink/70">hello@sweetwanbakery.com</p>
              </div>
            </div>
          </div>

          <div ref={rightRef}>
            {formSubmitted ? (
              <div className="card-surface rounded-lg border border-taupe/20 bg-white p-8 text-center shadow-elevate">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-taupe/15">
                  <svg className="h-8 w-8 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-medium text-ink mb-2">Message Sent!</h3>
                <p className="text-ink/70">We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-surface card-surface-hover space-y-5 rounded-lg p-6 md:p-8"
              >
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    className="input-field min-h-[120px] resize-none py-3"
                    placeholder="How can we help?"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <footer
        ref={footerRef}
        className="border-t border-white/10 bg-ink px-[6vw] py-12 text-white"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">Sweet wan Bakery</p>
            <p className="mt-1 text-sm text-white/65">Enriching Great Taste</p>
          </div>

          <nav className="flex flex-col gap-3 text-sm text-white/75 sm:flex-row sm:gap-8" aria-label="Footer">
            <a href="#cakes" className="rounded-md transition-colors hover:text-white focus-ring-dark">
              Cakes
            </a>
            <a href="#contact" className="rounded-md transition-colors hover:text-white focus-ring-dark">
              Contact
            </a>
            <span className="text-white/45">Portland, OR</span>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/15 focus-ring-dark"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/15 focus-ring-dark"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-white/50 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Sweet wan Bakery. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
