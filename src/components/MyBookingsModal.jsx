import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, ShieldCheck, AlertCircle, RefreshCw, Star, Ban, CalendarDays, Check } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MyBookingsModal({ isOpen, onClose, onOpenReview }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  // Reschedule state
  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState('');

  const fetchBookings = async (emailOverride) => {
    setLoading(true);
    setError('');
    try {
      const email = emailOverride || user?.email || lookupEmail;
      const res = await api.bookings.getMyBookings(email);
      setBookings(res.bookings || []);
    } catch (err) {
      setError(err.message || 'Unable to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (user?.email) {
        setLookupEmail(user.email);
        fetchBookings(user.email);
      } else {
        setLoading(false);
      }
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleCancel = async (bookingId) => {
    const reason = window.prompt('Please provide a reason for cancellation:', 'Schedule change');
    if (reason === null) return; // User cancelled prompt

    setCancellingId(bookingId);
    try {
      await api.bookings.cancel(bookingId, reason || 'Cancelled by customer');
      await fetchBookings();
    } catch (err) {
      alert(err.message || 'Failed to cancel booking.');
    } finally {
      setCancellingId(null);
    }
  };

  const handleOpenReschedule = (booking) => {
    setReschedulingBooking(booking);
    setNewDate(booking.bookingDate || new Date().toISOString().split('T')[0]);
    setNewTimeSlot(booking.timeSlot || '10:00 AM - 12:00 PM');
    setRescheduleSuccess('');
  };

  const handleSubmitReschedule = async (e) => {
    e.preventDefault();
    if (!reschedulingBooking || !newDate || !newTimeSlot) return;

    setRescheduleLoading(true);
    try {
      const res = await api.bookings.reschedule(
        reschedulingBooking._id || reschedulingBooking.bookingId,
        newDate,
        newTimeSlot
      );
      if (res.success) {
        setRescheduleSuccess('Rescheduled successfully!');
        setTimeout(() => {
          setReschedulingBooking(null);
          setRescheduleSuccess('');
          fetchBookings();
        }, 1200);
      }
    } catch (err) {
      alert(err.message || 'Failed to reschedule booking.');
    } finally {
      setRescheduleLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#36C998]/20 text-[#006644]">Completed</span>;
      case 'in-progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5669E8]/20 text-[#5669E8]">In Progress</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FF4D4D]/20 text-[#CC0000]">Cancelled</span>;
      case 'assigned':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F1D94C]/40 text-[#8B7800]">Pro Assigned</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F8F9FC] text-[#71717A] border border-[#E7E7EB]">Pending</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EEF0FF] text-[#5669E8]">Confirmed</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-[760px] w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7EB] relative max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F0F2F5]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5669E8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#36C998]" /> Mendx Booking Dashboard
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-[800] text-[#0B0B2B] tracking-tight mt-1">
              Track & Manage Bookings
            </h3>
            <p className="text-xs text-[#71717A]">
              Live updates synchronized directly with our professional service dispatch system.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E7E7EB] text-[#10101B] flex items-center justify-center transition-colors shrink-0"
            aria-label="Close bookings modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reschedule Drawer/Modal inside */}
        {reschedulingBooking && (
          <div className="my-3 p-4 bg-[#EEF0FF]/60 rounded-2xl border border-[#5669E8]/30 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5669E8]">
                <CalendarDays className="w-4 h-4" />
                <span>Reschedule Booking ({reschedulingBooking.bookingId})</span>
              </div>
              <button
                type="button"
                onClick={() => setReschedulingBooking(null)}
                className="text-xs text-[#71717A] hover:text-[#0B0B2B] font-bold"
              >
                Close
              </button>
            </div>

            {rescheduleSuccess ? (
              <div className="p-3 bg-[#36C998]/20 text-[#006644] rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-[#36C998]" />
                <span>{rescheduleSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReschedule} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                <div>
                  <label className="block text-[11px] font-bold text-[#17172B] mb-1">New Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-[#E7E7EB] rounded-xl text-xs font-medium text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#17172B] mb-1">New Time Slot</label>
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full h-10 px-2.5 bg-white border border-[#E7E7EB] rounded-xl text-xs font-medium text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
                  >
                    <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={rescheduleLoading}
                  className="h-10 px-4 bg-[#5669E8] hover:bg-[#3938AD] text-white text-xs font-bold rounded-xl transition-all shadow-sm disabled:opacity-60"
                >
                  {rescheduleLoading ? 'Updating...' : 'Confirm Reschedule'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Guest email search if not logged in */}
        {!user && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchBookings(lookupEmail);
            }}
            className="mt-4 flex gap-2"
          >
            <input
              type="email"
              placeholder="Enter your booking email..."
              required
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className="flex-1 h-10 px-3.5 bg-[#F8F9FC] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#0B0B2B] focus:outline-none focus:border-[#5669E8]"
            />
            <button
              type="submit"
              className="h-10 px-4 bg-[#5669E8] hover:bg-[#3938AD] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
            >
              Search Bookings
            </button>
          </form>
        )}

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5">
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 text-[#5669E8] animate-spin mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#71717A]">Fetching bookings from database...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-[#FF4D4D]/15 text-[#CC0000] text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#FF4D4D]" />
              <span>{error}</span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 bg-[#F8F9FC] rounded-2xl border border-dashed border-[#E7E7EB]">
              <Calendar className="w-12 h-12 text-[#71717A] mx-auto mb-2 opacity-40" />
              <p className="text-sm font-bold text-[#0B0B2B]">No Bookings Found</p>
              <p className="text-xs text-[#71717A] mt-1 max-w-[320px] mx-auto">
                {user ? "You haven't scheduled any home services yet." : "Enter your booking email or sign in to view your appointments."}
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id || booking.bookingId}
                className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FC] border border-[#E7E7EB] hover:border-[#5669E8]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-[#5669E8] bg-white px-2 py-0.5 rounded border border-[#E7E7EB]">
                      {booking.bookingId}
                    </span>
                    {getStatusBadge(booking.bookingStatus)}
                    <span className="text-[11px] font-semibold text-[#71717A] bg-white px-2 py-0.5 rounded">
                      {booking.proTier}
                    </span>
                  </div>

                  <h4 className="text-[17px] font-bold text-[#0B0B2B]">
                    {booking.serviceTitle}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#71717A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#5669E8]" />
                      {booking.bookingDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5669E8]" />
                      {booking.timeSlot}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[220px]">
                      <MapPin className="w-3.5 h-3.5 text-[#5669E8]" />
                      {booking.customerInfo?.address}
                    </span>
                  </div>

                  <div className="text-xs text-[#0B0B2B] font-semibold pt-1">
                    Total: <span className="text-[#5669E8] font-bold">₹{booking.priceBreakdown?.total || 499}</span>
                    {booking.priceBreakdown?.discount > 0 && (
                      <span className="text-[#36C998] ml-2 text-[11px]">
                        (Saved ₹{booking.priceBreakdown.discount} with {booking.priceBreakdown.couponCode})
                      </span>
                    )}
                  </div>

                  {booking.cancellationReason && (
                    <div className="text-[11px] text-[#FF4D4D] italic">
                      Reason: {booking.cancellationReason}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {booking.bookingStatus === 'completed' && (
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenReview) onOpenReview(booking);
                      }}
                      className="h-9 px-3.5 bg-[#0B0B2B] hover:bg-[#5669E8] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Star className="w-3.5 h-3.5 fill-[#F1D94C] text-[#F1D94C]" />
                      <span>Review</span>
                    </button>
                  )}

                  {booking.bookingStatus !== 'completed' && booking.bookingStatus !== 'cancelled' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOpenReschedule(booking)}
                        className="h-9 px-3 bg-white hover:bg-[#EEF0FF] text-[#5669E8] border border-[#E7E7EB] text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>Reschedule</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCancel(booking._id || booking.bookingId)}
                        disabled={cancellingId === (booking._id || booking.bookingId)}
                        className="h-9 px-3 bg-white hover:bg-[#FF4D4D]/10 text-[#CC0000] border border-[#E7E7EB] text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                      >
                        <Ban className="w-3 h-3 text-[#FF4D4D]" />
                        <span>{cancellingId === (booking._id || booking.bookingId) ? 'Cancelling...' : 'Cancel'}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#F0F2F5] flex items-center justify-between text-xs text-[#71717A]">
          <button
            onClick={() => fetchBookings()}
            className="flex items-center gap-1 font-semibold text-[#5669E8] hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh List
          </button>
          <span>24/7 Home Support Available</span>
        </div>

      </div>
    </div>
  );
}
