import { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  inStock?: boolean;
  onAddToCart: (
    product: { id: string; name: string; price: number; image: string; category?: string },
    quantity: number
  ) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description = 'Freshly baked daily',
  category,
  inStock = true,
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;

    setIsAdding(true);
    onAddToCart({ id, name, price, image, category }, quantity);

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="product-card group card-surface card-surface-hover overflow-hidden rounded-lg hover:-translate-y-1.5 transition-transform duration-500 ease-out">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={`${name} — ${description}`}
          className="product-image w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          loading="lazy"
          decoding="async"
        />

        {!inStock && (
          <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
            <span className="bg-white text-ink px-4 py-2 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3 mb-1 min-w-0">
            <h3 className="font-display text-lg font-medium text-ink leading-snug min-w-0 [overflow-wrap:anywhere]">
              {name}
            </h3>
            <span className="font-display text-lg font-semibold text-taupe-dark shrink-0 tabular-nums">
              ${price}
            </span>
          </div>
          <p className="text-sm text-ink/60">{description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-ink/70">Qty:</span>
            <div className="flex items-center border border-ink/15 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={decrementQuantity}
                disabled={quantity <= 1 || !inStock}
                className="p-2 hover:bg-ink/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-ink" />
              </button>
              <span className="w-12 text-center font-medium text-ink border-x border-ink/10 py-2">
                {quantity}
              </span>
              <button
                type="button"
                onClick={incrementQuantity}
                disabled={quantity >= 10 || !inStock}
                className="p-2 hover:bg-ink/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-ink" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock || isAdding}
            className={`btn-secondary w-full gap-2 py-2.5 min-h-[44px] transition-all duration-300 ${
              isAdding ? 'bg-taupe text-white border-taupe' : ''
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                Added!
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 shrink-0" />
                {quantity > 1 ? `Add ${quantity} to Cart` : 'Add to Cart'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
