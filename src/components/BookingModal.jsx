import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Tag, 
  Loader2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function BookingModal({ service, isOpen, onClose, onOpenMyBookings }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM - 12:00 PM',
    proTier: 'Master Specialist',
    notes: ''
  });

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
      }));
    }
  }, [user, isOpen]);

  // Pricing & Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const title = service?.title || service?.name || 'Mendx Home Service';
  const baseNumericPrice = service?.numericPrice || 499;
  const tierSurcharge = formData.proTier === 'Elite Craftsman' ? 299 : formData.proTier === 'Master Specialist' ? 149 : 0;
  const subtotal = baseNumericPrice + tierSurcharge;
  const discountAmount = appliedCoupon?.discount || 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setValidatingCoupon(true);
    setCouponError('');
    try {
      const res = await api.coupons.validate(couponInput.trim(), subtotal);
      if (res.valid) {
        setAppliedCoupon(res);
      }
    } catch (err) {
      setCouponError(err.message || 'Invalid or expired coupon code.');
      setAppliedCoupon(null);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        serviceId: service?._id || service?.id,
        serviceTitle: title,
        bookingDate: formData.date,
        timeSlot: formData.timeSlot,
        proTier: formData.proTier,
        basePrice: baseNumericPrice,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
        customerInstructions: formData.notes,
        couponCode: appliedCoupon?.code || '',
        paymentMethod: 'online',
      };

      const res = await api.bookings.create(payload);
      if (res.success && res.booking) {
        setConfirmedBooking(res.booking);
      } else {
        throw new Error(res.error || 'Failed to confirm booking.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to confirm booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setErrorMessage('');
    setAppliedCoupon(null);
    setCouponInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-[580px] w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7EB] relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E7E7EB] text-[#10101B] flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Booking Confirmation View */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#36C998]/20 text-[#006644] flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
              <CheckCircle2 className="w-10 h-10 text-[#36C998]" />
            </div>

            <h3 className="text-[26px] font-bold text-[#0B0B2B] tracking-tight">
              Booking Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] mt-1">
              Your appointment is scheduled with a certified Mendx professional.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-[#F8F9FC] border border-[#E7E7EB] text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-[#71717A]">Booking ID:</span>
                <span className="font-mono font-bold text-[#5669E8]">{confirmedBooking.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Service:</span>
                <span className="font-semibold text-[#0B0B2B]">{confirmedBooking.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Date & Slot:</span>
                <span className="font-medium text-[#0B0B2B]">{confirmedBooking.bookingDate} ({confirmedBooking.timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Technician Tier:</span>
                <span className="font-semibold text-[#5669E8]">{confirmedBooking.proTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Service Address:</span>
                <span className="font-medium text-[#0B0B2B] truncate max-w-[220px]">{confirmedBooking.customerInfo?.address}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E7E7EB]">
                <span className="text-[#71717A]">Total Amount:</span>
                <span className="font-bold text-[#0B0B2B] text-base">₹{confirmedBooking.priceBreakdown?.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Status:</span>
                <span className="text-[#36C998] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Confirmed & Verified
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  handleResetAndClose();
                  if (onOpenMyBookings) onOpenMyBookings();
                }}
                className="flex-1 h-12 bg-[#5669E8] hover:bg-[#3938AD] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Track in My Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetAndClose}
                className="h-12 px-5 bg-[#F0F2F5] hover:bg-[#E7E7EB] text-[#10101B] text-xs sm:text-sm font-semibold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form View */
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5669E8] mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Mendx On-Demand Booking
            </div>

            <h3 className="text-[22px] sm:text-[25px] font-bold text-[#0B0B2B] tracking-tight leading-snug">
              {title}
            </h3>

            {errorMessage && (
              <div className="mt-3 p-3 rounded-xl bg-[#FF4D4D]/10 text-[#FF4D4D] text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              
              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17172B] mb-1">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full h-11 pl-9 pr-3 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17172B] mb-1">
                    Available Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full h-11 pl-9 pr-3 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#0B0B2B] focus:outline-none focus:border-[#5669E8] appearance-none"
                    >
                      <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                      <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Technician Tier */}
              <div>
                <label className="block text-xs font-semibold text-[#17172B] mb-1.5">
                  Professional Technician Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Standard', val: 'Standard Certified', extra: 0 },
                    { label: 'Master (+₹149)', val: 'Master Specialist', extra: 149 },
                    { label: 'Elite (+₹299)', val: 'Elite Craftsman', extra: 299 },
                  ].map((tier) => (
                    <button
                      key={tier.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, proTier: tier.val })}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        formData.proTier === tier.val
                          ? 'bg-[#EEF0FF] border-[#5669E8] text-[#5669E8] shadow-xs'
                          : 'bg-[#F8F9FC] border-[#E7E7EB] text-[#71717A] hover:border-gray-400'
                      }`}
                    >
                      <div>{tier.label}</div>
                      <div className="text-[10px] opacity-75 font-normal mt-0.5">
                        {tier.extra === 0 ? 'Base' : `+₹${tier.extra}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Information & Service Address */}
              <div className="pt-2 border-t border-[#F0F2F5] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#17172B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#17172B] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17172B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-3.5 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17172B] mb-1">
                    Complete Service Address *
                  </label>
                  <input
                    type="text"
                    placeholder="Flat / House No, Building, Street, Area, City"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-11 px-3.5 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                    required
                  />
                </div>
              </div>

              {/* Promo Coupon Input */}
              <div className="pt-2 border-t border-[#F0F2F5]">
                <label className="block text-xs font-semibold text-[#17172B] mb-1">
                  Have a Promo Code? (Try: <span className="font-mono text-[#5669E8]">WELCOME100</span> or <span className="font-mono text-[#5669E8]">MENDX20</span>)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full h-10 pl-8 pr-3 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs font-mono font-bold text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={validatingCoupon || !couponInput.trim()}
                    className="h-10 px-4 bg-[#0B0B2B] hover:bg-[#5669E8] text-white text-xs font-semibold rounded-xl transition-colors shrink-0 disabled:opacity-50"
                  >
                    {validatingCoupon ? 'Checking...' : 'Apply'}
                  </button>
                </div>

                {couponError && (
                  <p className="text-[11px] font-semibold text-[#FF4D4D] mt-1">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-[11px] font-semibold text-[#36C998] mt-1">
                    ✓ Promo '{appliedCoupon.code}' applied! Saved ₹{appliedCoupon.discount}.
                  </p>
                )}
              </div>

              {/* Price Summary Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#F8F9FC] border border-[#E7E7EB] space-y-1 text-xs">
                <div className="flex justify-between text-[#71717A]">
                  <span>Base Service Fee:</span>
                  <span>₹{baseNumericPrice}</span>
                </div>
                <div className="flex justify-between text-[#71717A]">
                  <span>Tier Surcharge ({formData.proTier}):</span>
                  <span>+₹{tierSurcharge}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#36C998] font-semibold">
                    <span>Promo Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#0B0B2B] font-bold text-sm pt-1.5 border-t border-[#E7E7EB]">
                  <span>Total Amount:</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 h-12 bg-[#5669E8] hover:bg-[#3938AD] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking Certified Pro & Saving to Database...</span>
                  </>
                ) : (
                  <span>Confirm Booking (₹{finalTotal})</span>
                )}
              </button>

              <div className="text-center text-[11px] text-[#71717A]">
                Free cancellation or reschedule up to 2 hours before scheduled slot.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
