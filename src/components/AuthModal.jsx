import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpVerificationView from './OtpVerificationView';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'otp'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
    city: 'Chicago, IL',
  });
  const [challengeData, setChallengeData] = useState(null);
  const [loginWithOtpOnly, setLoginWithOtpOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login, loginWithOtp, verifyOtp, resendOtp, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        let res;
        if (loginWithOtpOnly) {
          res = await loginWithOtp(formData.email.trim().toLowerCase());
        } else {
          res = await login(formData.email.trim().toLowerCase(), formData.password);
        }

        if (res.requiresOtp && res.challengeId) {
          setChallengeData(res);
          setMode('otp');
        } else {
          setSuccessMessage('Logged in successfully!');
          setTimeout(() => {
            if (onSuccess) onSuccess();
            onClose();
          }, 700);
        }
      } else {
        await register(formData);
        setSuccessMessage('Welcome to Mendx! Account created successfully.');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 700);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (code) => {
    if (!challengeData?.challengeId) {
      throw new Error('No active verification challenge. Please sign in again.');
    }
    const res = await verifyOtp(challengeData.challengeId, code);
    setTimeout(() => {
      if (onSuccess) onSuccess();
      onClose();
    }, 900);
    return res;
  };

  const handleResendOtp = async () => {
    if (!challengeData?.challengeId) {
      throw new Error('No active verification challenge. Please sign in again.');
    }
    return await resendOtp(challengeData.challengeId);
  };

  const handleBackToLogin = () => {
    setMode('login');
    setChallengeData(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // 1-Click Demo Login
  const fillDemoAccount = (role) => {
    setMode('login');
    setChallengeData(null);
    setErrorMessage('');
    if (role === 'admin') {
      setFormData({ ...formData, email: 'admin@mendx.com', password: 'adminpassword123' });
    } else if (role === 'worker') {
      setFormData({ ...formData, email: 'pro@mendx.com', password: 'propassword123' });
    } else {
      setFormData({ ...formData, email: 'priya@example.com', password: 'priyapassword123' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] max-w-[480px] w-full p-6 sm:p-8 shadow-2xl border border-[#E7E7EB] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E7E7EB] text-[#10101B] flex items-center justify-center transition-colors"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* View Switch: OTP Screen vs Login/Register Screen */}
        {mode === 'otp' ? (
          <OtpVerificationView
            challengeId={challengeData?.challengeId}
            maskedEmail={challengeData?.maskedEmail}
            expiresInSeconds={challengeData?.expiresInSeconds || 300}
            resendCooldownSeconds={challengeData?.resendCooldownSeconds || 60}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            onBackToLogin={handleBackToLogin}
          />
        ) : (
          <>
            {/* Brand Header */}
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#6475E8] flex items-center justify-center text-white mx-auto mb-3 shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-[26px] font-bold text-[#080821] tracking-tight">
                {mode === 'login' ? 'Welcome Back to Mendx' : 'Create Your Mendx Account'}
              </h3>
              <p className="text-xs sm:text-sm text-[#686975] mt-1">
                {mode === 'login'
                  ? 'Access your bookings, track verified technicians & manage service history.'
                  : 'Join thousands of homeowners enjoying high-touch on-demand home care.'}
              </p>
            </div>

            {/* Tab Toggle */}
            <div className="flex bg-[#F0F2F5] p-1 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'login' ? 'bg-white text-[#080821] shadow-xs' : 'text-[#686975] hover:text-[#080821]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'register' ? 'bg-white text-[#080821] shadow-xs' : 'text-[#686975] hover:text-[#080821]'
                }`}
              >
                Register
              </button>
            </div>

            {/* Error or Success feedback */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#FF795B]/15 text-[#510D31] text-xs font-medium border border-[#FF795B]/30">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#2FC493]/15 text-[#00462F] text-xs font-medium border border-[#2FC493]/30 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2FC493] shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#10101B] mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#92939C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 bg-[#FAF7F3] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#10101B] focus:outline-none focus:border-[#6475E8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10101B] mb-1">Account Role</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'customer' })}
                        className={`h-9 rounded-lg text-xs font-semibold border transition-all ${
                          formData.role === 'customer'
                            ? 'bg-[#6475E8] text-white border-[#6475E8]'
                            : 'bg-[#FAF7F3] text-[#10101B] border-[#E7E7EB]'
                        }`}
                      >
                        Homeowner / Customer
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'worker' })}
                        className={`h-9 rounded-lg text-xs font-semibold border transition-all ${
                          formData.role === 'worker'
                            ? 'bg-[#6475E8] text-white border-[#6475E8]'
                            : 'bg-[#FAF7F3] text-[#10101B] border-[#E7E7EB]'
                        }`}
                      >
                        Service Pro / Worker
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#10101B] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#92939C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 bg-[#FAF7F3] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#10101B] focus:outline-none focus:border-[#6475E8]"
                  />
                </div>
              </div>

              {mode === 'login' && loginWithOtpOnly ? (
                <div className="p-3 rounded-xl bg-[#EEF0FF] border border-[#5968F5]/20 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#5968F5]">🔐 Passwordless OTP Login</span>
                    <button
                      type="button"
                      onClick={() => setLoginWithOtpOnly(false)}
                      className="text-[#6475E8] hover:underline font-semibold"
                    >
                      Use Password
                    </button>
                  </div>
                  <p className="text-[#686975] mt-1 text-[11px] leading-relaxed">
                    Forgot password? A secure one-time 6-digit code will be sent to your email to use as your login credential.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#10101B]">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setLoginWithOtpOnly(true)}
                        className="text-[11px] font-semibold text-[#5968F5] hover:underline"
                      >
                        Forgot password? Sign in with OTP
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#92939C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required={!loginWithOtpOnly}
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 bg-[#FAF7F3] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#10101B] focus:outline-none focus:border-[#6475E8]"
                    />
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#10101B] mb-1">Phone</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-[#92939C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 010-0200"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-10 pl-8 pr-3 bg-[#FAF7F3] border border-[#E7E7EB] rounded-lg text-xs text-[#10101B] focus:outline-none focus:border-[#6475E8]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#10101B] mb-1">Metro City</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-[#92939C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Chicago, IL"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full h-10 pl-8 pr-3 bg-[#FAF7F3] border border-[#E7E7EB] rounded-lg text-xs text-[#10101B] focus:outline-none focus:border-[#6475E8]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#6475E8] hover:bg-[#3938AD] active:scale-[0.99] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md mt-5 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>
                    {mode === 'login'
                      ? loginWithOtpOnly
                        ? 'Send One-Time Login Code'
                        : 'Sign In & Get OTP'
                      : 'Create Account'}
                  </span>
                )}
              </button>
            </form>

            {/* 1-Click Test Credentials */}
            <div className="mt-6 pt-4 border-t border-[#F0F2F5]">
              <div className="text-[11px] font-semibold text-[#92939C] uppercase tracking-wider mb-2 text-center">
                Quick 1-Click Demo Accounts
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('customer')}
                  className="py-1.5 px-2 bg-[#FAF7F3] hover:bg-[#E9E8FF] rounded-lg text-[11px] font-medium text-[#10101B] transition-colors truncate"
                >
                  👤 Customer (Priya)
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('worker')}
                  className="py-1.5 px-2 bg-[#FAF7F3] hover:bg-[#E9E8FF] rounded-lg text-[11px] font-medium text-[#10101B] transition-colors truncate"
                >
                  🛠️ Pro (Alex)
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="py-1.5 px-2 bg-[#FAF7F3] hover:bg-[#E9E8FF] rounded-lg text-[11px] font-medium text-[#10101B] transition-colors truncate"
                >
                  👑 Admin
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
