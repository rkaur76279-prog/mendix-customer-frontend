import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function MobileWishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveFromWishlist,
  onAddToCart,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200 md:hidden">
      <div className="w-full max-h-[85vh] bg-white rounded-t-[28px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#F0E8E8]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C8556A] fill-[#C8556A]" />
            <h3 className="text-[17px] font-bold text-[#2D1A22]">
              My Wishlist ({wishlistItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#5C3B47]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-[#E9DFD2] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2D1A22]">Your wishlist is empty</p>
              <p className="text-xs text-[#9B8C93] mt-1">Tap the heart on any product to save your favorites.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#FAF7F2] rounded-2xl flex items-center gap-3 border border-[#E9DFD2]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white"
                />

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-[#C8556A] uppercase">{item.brand}</div>
                  <h4 className="text-[13px] font-bold text-[#2D1A22] truncate">{item.name}</h4>
                  <div className="text-xs font-extrabold text-[#C8556A] mt-0.5">${item.price}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(item);
                      onRemoveFromWishlist(item.id);
                    }}
                    className="h-8 px-2.5 bg-[#2D1A22] hover:bg-black text-white text-[11px] font-bold rounded-lg flex items-center gap-1 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="p-1.5 text-[#9B8C93] hover:text-[#C8556A]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
