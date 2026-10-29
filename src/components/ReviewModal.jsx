import React, { useState } from 'react';
import { X, Star, Loader2, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function ReviewModal({ booking, isOpen, onClose, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMessage('Please share a few words about your service experience.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await api.reviews.submit({
        bookingId: booking._id || booking.bookingId,
        rating,
        comment: comment.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        if (onReviewSubmitted) onReviewSubmitted();
        onClose();
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit review. Only completed bookings can be reviewed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-[500px] w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7EB] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E7E7EB] text-[#10101B] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#2FC493]/20 text-[#2FC493] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-[24px] font-bold text-[#10101B]">Review Published!</h3>
            <p className="text-sm text-[#686975] mt-1">
              Thank you for sharing your experience. Your feedback helps our Mendx community thrive.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6475E8] mb-1">
              <MessageSquare className="w-3.5 h-3.5" /> Customer Feedback
            </div>

            <h3 className="text-[24px] font-bold text-[#10101B] tracking-tight">
              Rate Your Experience
            </h3>
            <p className="text-xs text-[#686975] mt-0.5">
              Service: <span className="font-semibold text-[#10101B]">{booking.serviceTitle}</span> (Ref: {booking.bookingId})
            </p>

            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-[#FF795B]/15 text-[#510D31] text-xs font-medium border border-[#FF795B]/30 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#FF795B] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-semibold text-[#10101B] mb-2">Overall Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? 'text-[#F1D94C] fill-[#F1D94C]'
                            : 'text-[#E7E7EB]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-[#10101B]">{rating} / 5 Stars</span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-[#10101B] mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details of your experience: pro punctuality, craftsmanship quality, and speed..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3.5 bg-[#FAF7F3] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#10101B] focus:outline-none focus:border-[#6475E8]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#080821] hover:bg-[#3938AD] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Review...</span>
                  </>
                ) : (
                  <span>Submit Verified Review</span>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
