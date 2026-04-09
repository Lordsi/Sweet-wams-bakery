import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setOrderPlaced(false);
      setIsCartOpen(false);
    }, 2000);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-out ${
          isCartOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/40"
          onClick={() => setIsCartOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-paper shadow-elevate-3 transition-transform duration-500 ease-drawer ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-xl font-semibold text-ink">Your Cart</h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-ink/5 focus-ring"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-ink" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-ink/20" aria-hidden />
                  <p className="font-body text-ink/60">Your cart is empty</p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 rounded-md text-sm text-taupe underline-offset-4 transition-colors hover:underline focus-ring"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="card-surface flex gap-4 rounded-lg p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-sm font-medium text-ink">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-xs text-text-secondary">
                              {item.category}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="shrink-0 rounded p-1 transition-colors hover:bg-ink/5 focus-ring"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X className="h-4 w-4 text-ink/40" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-ink/20 transition-colors hover:border-taupe hover:bg-taupe/5 focus-ring"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-md border border-ink/20 transition-colors hover:border-taupe hover:bg-taupe/5 focus-ring"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-4 border-t border-ink/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="font-display text-lg font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button type="button" onClick={handleCheckout} className="btn-primary w-full">
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-secondary w-full"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-ink/10 bg-paper sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {orderPlaced ? 'Order Confirmed!' : 'Checkout'}
            </DialogTitle>
          </DialogHeader>

          {orderPlaced ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-taupe/15">
                <svg className="h-8 w-8 text-taupe" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-ink/80">Thank you for your order!</p>
              <p className="mt-1 text-sm text-text-secondary">We&apos;ll contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-4 py-4">
              <div>
                <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-medium text-ink">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  autoComplete="name"
                  className="input-field"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="checkout-email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  autoComplete="email"
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-medium text-ink">
                  Phone
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="input-field"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="checkout-date" className="mb-1.5 block text-sm font-medium text-ink">
                  Pickup Date
                </label>
                <input id="checkout-date" type="date" required className="input-field" />
              </div>
              <div className="border-t border-ink/10 pt-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-xl font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Place Order
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
