import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  UserCheck, 
  Tag, 
  RefreshCw, 
  AlertCircle,
  Plus
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminWorkerModal({ isOpen, onClose }) {
  const { user, isAdmin, isWorker } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'coupons'
  const [bookings, setBookings] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  // Coupon creation form state
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 50,
    expirationDate: '2027-12-31',
  });

  const fetchData = async () => {
    setLoading(true);
    setFeedback('');
    try {
      const bookingsRes = await api.bookings.getAllAdmin();
      setBookings(bookingsRes.bookings || []);
      setTotalRevenue(bookingsRes.totalRevenue || 0);

      if (isAdmin) {
        const couponsRes = await api.coupons.getAll();
        setCoupons(couponsRes.coupons || []);
      }
    } catch (err) {
      setFeedback(err.message || 'Failed to fetch management data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, isAdmin, isWorker]);

  if (!isOpen) return null;

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.bookings.updateStatus(bookingId, newStatus);
      setFeedback(`Booking updated to ${newStatus}.`);
      await fetchData();
    } catch (err) {
      alert(err.message || 'Status update failed.');
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await api.coupons.create(newCoupon);
      setFeedback(`Coupon '${newCoupon.code.toUpperCase()}' created successfully!`);
      setNewCoupon({
        code: '',
        discountType: 'percentage',
        discountValue: 15,
        minOrderValue: 50,
        expirationDate: '2027-12-31',
      });
      await fetchData();
    } catch (err) {
      alert(err.message || 'Failed to create coupon.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-[840px] w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7EB] relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F0F2F5]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6475E8]">
              <ShieldAlert className="w-3.5 h-3.5" />
              {isAdmin ? 'Mendx Super Admin Operations' : 'Certified Worker Dispatch Console'}
            </div>
            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#080821] tracking-tight mt-1">
              {isAdmin ? 'Platform Operations & Metrics' : 'My Assigned Service Jobs'}
            </h3>
            <p className="text-xs text-[#686975]">
              Logged in as <span className="font-bold text-[#10101B]">{user?.fullName}</span> ({user?.role})
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E7E7EB] text-[#10101B] flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Quick Stat Bar */}
        {isAdmin && (
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-[#FAF7F3] border border-[#E7E7EB]">
              <div className="text-[11px] font-semibold text-[#686975] uppercase">Total Bookings</div>
              <div className="text-2xl font-bold text-[#10101B] mt-0.5">{bookings.length}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#E9E8FF] border border-[#6475E8]/30">
              <div className="text-[11px] font-semibold text-[#3938AD] uppercase">Recorded Revenue</div>
              <div className="text-2xl font-bold text-[#3938AD] mt-0.5">${totalRevenue}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#2FC493]/15 border border-[#2FC493]/30">
              <div className="text-[11px] font-semibold text-[#00462F] uppercase">Active Coupons</div>
              <div className="text-2xl font-bold text-[#00462F] mt-0.5">{coupons.filter(c => c.isActive).length}</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        {isAdmin && (
          <div className="flex bg-[#F0F2F5] p-1 rounded-xl mb-4 shrink-0">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'bookings' ? 'bg-white text-[#080821] shadow-xs' : 'text-[#686975]'
              }`}
            >
              All Jobs & Dispatch ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'coupons' ? 'bg-white text-[#080821] shadow-xs' : 'text-[#686975]'
              }`}
            >
              Coupon Promotions ({coupons.length})
            </button>
          </div>
        )}

        {feedback && (
          <div className="mb-3 p-2.5 rounded-lg bg-[#2FC493]/15 text-[#00462F] text-xs font-semibold">
            {feedback}
          </div>
        )}

        {/* Tab 1: Bookings List */}
        {activeTab === 'bookings' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {loading ? (
              <div className="text-center py-10">
                <RefreshCw className="w-8 h-8 text-[#6475E8] animate-spin mx-auto mb-2" />
                <p className="text-xs text-[#686975]">Syncing with MongoDB database...</p>
              </div>
            ) : bookings.length === 0 ? (
              <p className="text-center text-xs text-[#686975] py-10">No jobs currently listed.</p>
            ) : (
              bookings.map((b) => (
                <div
                  key={b._id}
                  className="p-4 rounded-xl bg-[#FAF7F3] border border-[#E7E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#6475E8] bg-white px-2 py-0.5 rounded border border-[#E7E7EB]">
                        {b.bookingId}
                      </span>
                      <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-white text-[#10101B]">
                        {b.bookingStatus}
                      </span>
                      <span className="text-xs text-[#686975] font-medium">
                        ${b.priceBreakdown?.total || 79} ({b.paymentStatus})
                      </span>
                    </div>

                    <div className="text-sm font-bold text-[#10101B]">{b.serviceTitle}</div>
                    
                    <div className="text-xs text-[#686975]">
                      Customer: <span className="font-semibold text-[#10101B]">{b.customerInfo?.name}</span> ({b.customerInfo?.phone}) — {b.customerInfo?.address}
                    </div>

                    <div className="text-xs text-[#686975]">
                      Slot: {b.bookingDate} ({b.timeSlot})
                    </div>
                  </div>

                  {/* Status update controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="text-xs font-semibold text-[#686975]">Update:</label>
                    <select
                      value={b.bookingStatus}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="h-8 px-2.5 bg-white border border-[#E7E7EB] rounded-lg text-xs font-semibold text-[#10101B] focus:outline-none focus:border-[#6475E8]"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="assigned">Assigned</option>
                      <option value="in-progress">In-Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Coupons Management (Admin only) */}
        {activeTab === 'coupons' && isAdmin && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            
            {/* Create Coupon Form */}
            <form onSubmit={handleCreateCoupon} className="p-4 rounded-xl bg-[#FAF7F3] border border-[#E7E7EB] space-y-3">
              <div className="text-xs font-bold text-[#10101B] flex items-center gap-1.5 uppercase tracking-wider">
                <Plus className="w-3.5 h-3.5 text-[#6475E8]" /> Add New Promotional Coupon
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <input
                  type="text"
                  placeholder="Code (e.g. FLASH25)"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="h-9 px-3 bg-white border border-[#E7E7EB] rounded-lg text-xs font-bold text-[#10101B] focus:outline-none"
                />

                <select
                  value={newCoupon.discountType}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                  className="h-9 px-2.5 bg-white border border-[#E7E7EB] rounded-lg text-xs font-medium text-[#10101B] focus:outline-none"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Dollar ($)</option>
                </select>

                <input
                  type="number"
                  placeholder="Discount Value"
                  required
                  min="1"
                  value={newCoupon.discountValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                  className="h-9 px-3 bg-white border border-[#E7E7EB] rounded-lg text-xs font-medium text-[#10101B] focus:outline-none"
                />

                <button
                  type="submit"
                  className="h-9 bg-[#6475E8] hover:bg-[#3938AD] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  Create Coupon
                </button>
              </div>
            </form>

            {/* Existing Coupons Table */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#92939C] uppercase tracking-wider">Active Promo Codes</div>
              {coupons.map((c) => (
                <div
                  key={c._id}
                  className="p-3 rounded-xl bg-white border border-[#E7E7EB] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#3938AD] bg-[#E9E8FF] px-2.5 py-1 rounded">
                      {c.code}
                    </span>
                    <span className="text-xs text-[#10101B]">
                      {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `$${c.discountValue} FLAT OFF`}
                    </span>
                    <span className="text-[11px] text-[#686975]">
                      (Min Order: ${c.minOrderValue} · Used: {c.usedCount})
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    c.isActive ? 'bg-[#2FC493]/20 text-[#00462F]' : 'bg-[#92939C]/20 text-[#92939C]'
                  }`}>
                    {c.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
