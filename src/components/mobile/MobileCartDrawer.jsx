import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import api from '../../services/api';

export default function MobileCartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [validating, setValidating] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon?.discount || 0;
  const shipping = subtotal > 75 ? 0 : subtotal > 0 ? 8 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setValidating(true);
    setCouponError('');
    try {
      const res = await api.coupons.validate(couponCode.trim(), subtotal);
      if (res.valid) {
        setAppliedCoupon(res);
      }
    } catch (err) {
      setCouponError(err.message || 'Invalid coupon code');
      setAppliedCoupon(null);
    } finally {
      setValidating(false);
    }
  };

  const handleCheckout = () => {
    const ref = `MBF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setCheckoutComplete(true);
    if (onClearCart) onClearCart();
  };

  const handleFinish = () => {
    setCheckoutComplete(false);
    setAppliedCoupon(null);
    setCouponCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200 md:hidden">
      <div className="w-full max-h-[92vh] bg-white rounded-t-[28px] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#F0E8E8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C8556A]" />
            <h3 className="text-[17px] font-bold text-[#2D1A22]">
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#5C3B47]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {checkoutComplete ? (
          /* Checkout Confirmed View */
          <div className="p-6 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#5A8A6E]/15 text-[#5A8A6E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-[22px] font-bold text-[#2D1A22]">Order Placed Successfully!</h3>
            <p className="text-xs text-[#9B8C93]">
              Thank you for shopping at Mendx Beauty. Your order confirmation and tracking details have been sent to your email.
            </p>
            <div className="p-3 bg-[#FAF7F2] rounded-xl text-xs font-mono font-bold text-[#C8556A]">
              Order Reference: {orderRef}
            </div>
            <button
              onClick={handleFinish}
              className="w-full h-12 bg-[#2D1A22] hover:bg-black text-white text-xs font-bold rounded-xl"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Cart Items & Summary */
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-[#E9DFD2] mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#2D1A22]">Your bag is empty</p>
                  <p className="text-xs text-[#9B8C93] mt-1">Browse our beauty & fashion collections to find something you love.</p>
                </div>
              ) : (
                cartItems.map((item) => (
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
                      <div className="text-[10px] font-bold text-[#C8556A] uppercase tracking-wider">{item.brand}</div>
                      <h4 className="text-[13px] font-bold text-[#2D1A22] truncate">{item.name}</h4>
                      <div className="text-xs font-extrabold text-[#C8556A] mt-0.5">${item.price}</div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-white rounded-lg border border-[#E9DFD2] p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#5C3B47] active:scale-90"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#5C3B47] active:scale-90"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-[#9B8C93] hover:text-[#C8556A] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-[#F0E8E8] space-y-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                
                {/* Free shipping upsell */}
                {subtotal < 75 && subtotal > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F3] rounded-xl text-[11px] font-semibold text-[#C8556A]">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Add ${(75 - subtotal).toFixed(0)} more for free shipping!</span>
                  </div>
                )}

                {/* Coupon Code Input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#9B8C93] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo Code (WELCOME20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full h-10 pl-8 pr-3 bg-[#FAF7F2] border border-[#E9DFD2] rounded-xl text-xs font-mono font-bold text-[#2D1A22] focus:outline-none focus:border-[#C8556A]/50"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={validating || !couponCode.trim()}
                    className="h-10 px-4 bg-[#2D1A22] text-white text-xs font-bold rounded-xl active:scale-95 disabled:opacity-50"
                  >
                    {validating ? '...' : 'Apply'}
                  </button>
                </div>

                {couponError && <p className="text-[11px] font-semibold text-[#C8556A]">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-[11px] font-semibold text-[#5A8A6E]">
                    ✓ Code '{appliedCoupon.code}' applied! Saved ${appliedCoupon.discount.toFixed(2)}.
                  </p>
                )}

                {/* Order Summary */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between text-[#9B8C93]">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#5A8A6E] font-bold">
                      <span>Discount:</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#9B8C93]">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE ✨' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-[#2D1A22] font-extrabold text-sm pt-1 border-t border-[#E9DFD2]">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full h-12 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #C8556A 0%, #9B3A4F 100%)',
                    boxShadow: '0 4px 14px rgba(200, 85, 106, 0.3)',
                  }}
                >
                  <span>Proceed to Checkout (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
