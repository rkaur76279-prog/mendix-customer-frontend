import React from 'react';
import { ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MobileHeader({ cartCount = 0, wishlistCount = 0, onOpenCart, onOpenWishlist, onOpenProfile }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#F0E8E8] px-4 py-3 flex items-center justify-between shadow-[0_2px_12px_rgba(200,85,106,0.06)]">

      {/* Brand Logo Left */}
      <a href="/" className="flex items-center gap-2.5 select-none group" aria-label="Mendx Beauty Home">
        {/* Logo mark — abstract M/bloom shape */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C8556A] to-[#9B3A4F] flex items-center justify-center shadow-sm">
          <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[20px] font-[800] text-[#2D1A22] tracking-tight leading-none">
            Mendx
          </span>
          <span className="text-[9px] uppercase tracking-[0.12em] text-[#C8556A] font-bold leading-none mt-0.5">
            Beauty &amp; Fashion
          </span>
        </div>
      </a>

      {/* Right Icons */}
      <div className="flex items-center gap-1">

        {/* Wishlist */}
        <button
          onClick={onOpenWishlist}
          aria-label="View Wishlist"
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#5C3B47] hover:bg-[#FFF0F3] active:scale-95 transition-all"
        >
          <Heart className="w-5 h-5" strokeWidth={1.9} />
          {wishlistCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#C8556A] text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Shopping Bag */}
        <button
          onClick={onOpenCart}
          aria-label="View Shopping Bag"
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#5C3B47] hover:bg-[#FFF0F3] active:scale-95 transition-all"
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.9} />
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#C8556A] text-white text-[10px] font-bold flex items-center justify-center leading-none animate-in zoom-in">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}
