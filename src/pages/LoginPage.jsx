import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpVerificationView from '../components/OtpVerificationView';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [challengeData, setChallengeData] = useState(null);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [loginWithOtpOnly, setLoginWithOtpOnly] = useState(false);

  const { login, loginWithOtp, verifyOtp, resendOtp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Handle Login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || (!loginWithOtpOnly && !password)) {
      setError(loginWithOtpOnly ? 'Please provide your registered email.' : 'Please provide your registered email and password.');
      return;
    }

    try {
      setLoading(true);
      let res;
      if (loginWithOtpOnly) {
        res = await loginWithOtp(email.trim().toLowerCase());
      } else {
        res = await login(email.trim().toLowerCase(), password);
      }

      if (res && res.requiresOtp && res.challengeId) {
        setChallengeData(res);
        setIsOtpStep(true);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (code) => {
    if (!challengeData?.challengeId) {
      throw new Error('No active verification session. Please log in again.');
    }
    const res = await verifyOtp(challengeData.challengeId, code);
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 800);
    return res;
  };

  const handleResendOtp = async () => {
    if (!challengeData?.challengeId) {
      throw new Error('No active verification session.');
    }
    return await resendOtp(challengeData.challengeId);
  };

  const handleBackToLogin = () => {
    setIsOtpStep(false);
    setChallengeData(null);
    setError('');
  };

  const fillDemoAccount = (role) => {
    setIsOtpStep(false);
    setChallengeData(null);
    setError('');
    if (role === 'admin') {
      setEmail('admin@mendx.com');
      setPassword('adminpassword123');
    } else if (role === 'worker') {
      setEmail('pro@mendx.com');
      setPassword('propassword123');
    } else {
      setEmail('priya@example.com');
      setPassword('priyapassword123');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <a href="/" className="inline-flex items-center gap-2.5 mx-auto group mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#5968F5] flex items-center justify-center text-white shadow-lg shadow-[#5968F5]/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-3xl font-extrabold text-[#10102F] tracking-tight">Mendx</span>
        </a>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        {isOtpStep ? (
          <div className="shadow-xl rounded-[24px] border border-[#E7E7EB] bg-white">
            <OtpVerificationView
              challengeId={challengeData?.challengeId}
              maskedEmail={challengeData?.maskedEmail}
              expiresInSeconds={challengeData?.expiresInSeconds || 300}
              resendCooldownSeconds={challengeData?.resendCooldownSeconds || 60}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              onBackToLogin={handleBackToLogin}
            />
          </div>
        ) : (
          <div className="bg-white py-8 px-6 shadow-xl border border-[#E7E7EB] rounded-[24px] sm:px-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#10102F] tracking-tight">Sign In to Mendx</h2>
              <p className="text-xs sm:text-sm text-[#686975] mt-1">
                Access your bookings, track verified technicians & schedule home care.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-[#FFF2F0] border border-[#FFCCC7] flex items-start space-x-3 text-[#CF1322] text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#F5222D]" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-[#10102F] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#92939C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-4 bg-[#FAF7F3] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#10102F] focus:outline-none focus:border-[#5968F5] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {loginWithOtpOnly ? (
                <div className="p-3.5 rounded-xl bg-[#EEF0FF] border border-[#5968F5]/20 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#5968F5]">🔐 Passwordless OTP Login</span>
                    <button
                      type="button"
                      onClick={() => setLoginWithOtpOnly(false)}
                      className="text-[#5968F5] hover:underline font-semibold"
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
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#10102F] uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setLoginWithOtpOnly(true)}
                      className="text-xs font-semibold text-[#5968F5] hover:underline"
                    >
                      Forgot password? Sign in with OTP
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#92939C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required={!loginWithOtpOnly}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-4 bg-[#FAF7F3] border border-[#E7E7EB] rounded-xl text-xs sm:text-sm text-[#10102F] focus:outline-none focus:border-[#5968F5] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#5968F5] hover:bg-[#4351DB] active:scale-[0.99] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#5968F5]/25 mt-5 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{loginWithOtpOnly ? 'Send Login Code (OTP)' : 'Sign In & Request Code'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Preload */}
            <div className="mt-6 pt-5 border-t border-[#F0F2F5]">
              <div className="text-[11px] font-semibold text-[#92939C] uppercase tracking-wider mb-2 text-center">
                Quick 1-Click Demo Accounts
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('customer')}
                  className="py-1.5 px-2 bg-[#FAF7F3] hover:bg-[#EEF0FF] rounded-lg text-[11px] font-medium text-[#10102F] transition-colors truncate"
                >
                  👤 Customer
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('worker')}
                  className="py-1.5 px-2 bg-[#FAF7F3] hover:bg-[#EEF0FF] rounded-lg text-[11px] font-medium text-[#10102F] transition-colors truncate"
                >
                  🛠️ Pro Worker
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="py-1.5 px-2 bg-[#FAF7F3] hover:bg-[#EEF0FF] rounded-lg text-[11px] font-medium text-[#10102F] transition-colors truncate"
                >
                  👑 Admin
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-xs text-[#686975]">
          Need to book a home service? Return to{' '}
          <a href="/" className="font-bold text-[#5968F5] hover:underline">
            Mendx Homepage
          </a>
        </p>
      </div>
    </div>
  );
}

