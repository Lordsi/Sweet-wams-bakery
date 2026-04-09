import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Our Cakes', href: '#cakes' },
  { label: 'Buns', href: '#buns' },
  { label: 'Croissants', href: '#croissants' },
  { label: 'Bread', href: '#bread' },
  { label: 'Donuts', href: '#donuts' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 100);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out ${
          isScrolled
            ? 'bg-paper/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full min-w-0 px-4 sm:px-6 lg:px-[6vw]">
          <div className="flex items-center justify-between gap-2 h-16 lg:h-20 min-w-0">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-ink rounded-md focus-ring min-w-0 shrink leading-snug"
            >
              Sweet wan Bakery
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-body text-ink/80 hover:text-ink transition-colors duration-300 ease-out rounded-md px-1 py-0.5 -mx-1 focus-ring"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-ink/5 rounded-full transition-colors duration-200 ease-out focus-ring"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 text-ink" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-taupe text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="btn-secondary hidden lg:inline-flex"
              >
                Order Online
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-ink/5 rounded-full transition-colors focus-ring"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-ink" />
                ) : (
                  <Menu className="w-5 h-5 text-ink" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-paper/98 backdrop-blur-md border-t border-ink/10 transition-[opacity,transform] duration-300 ease-out ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-3 pointer-events-none'
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-base font-body text-ink/80 hover:text-ink py-2 transition-colors rounded-md focus-ring"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('#contact')}
              className="btn-primary mt-4 w-full"
            >
              Order Online
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
