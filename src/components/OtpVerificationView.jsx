import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Mail,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Lock,
} from 'lucide-react';

export default function OtpVerificationView({
  challengeId,
  maskedEmail,
  expiresInSeconds = 300,
  resendCooldownSeconds = 60,
  onVerify,
  onResend,
  onBackToLogin,
}) {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('Verification code sent to your email.');
  const [isSuccess, setIsSuccess] = useState(false);

  // Expiration countdown (in seconds)
  const [expiryTimer, setExpiryTimer] = useState(expiresInSeconds);
  // Resend cooldown timer (in seconds)
  const [cooldownTimer, setCooldownTimer] = useState(resendCooldownSeconds);

  // References to the 6 individual input boxes
  const inputRefs = useRef([]);

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Expiry countdown effect
  useEffect(() => {
    if (expiryTimer <= 0) return;
    const interval = setInterval(() => {
      setExpiryTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryTimer]);

  // Resend cooldown countdown effect
  useEffect(() => {
    if (cooldownTimer <= 0) return;
    const interval = setInterval(() => {
      setCooldownTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle individual digit change
  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, ''); // keep only numbers

    if (!digit) {
      const updated = [...otpDigits];
      updated[index] = '';
      setOtpDigits(updated);
      return;
    }

    // If multiple digits were entered (e.g. autofill)
    if (digit.length > 1) {
      handlePastedCode(digit);
      return;
    }

    const updated = [...otpDigits];
    updated[index] = digit[0];
    setOtpDigits(updated);
    setErrorMessage('');

    // Advance focus to next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace and arrow navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
        const updated = [...otpDigits];
        updated[index - 1] = '';
        setOtpDigits(updated);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting full 6-digit code
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text/plain').trim();
    handlePastedCode(pasted);
  };

  const handlePastedCode = (code) => {
    const digits = code.replace(/\D/g, '').slice(0, 6);
    if (!digits) return;

    const updated = ['', '', '', '', '', ''];
    for (let i = 0; i < digits.length; i++) {
      updated[i] = digits[i];
    }
    setOtpDigits(updated);
    setErrorMessage('');

    // Focus last filled box or next empty box
    const nextIdx = Math.min(digits.length, 5);
    inputRefs.current[nextIdx]?.focus();
  };

  // Submit OTP Verification
  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const fullOtp = otpDigits.join('');

    if (fullOtp.length < 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }

    if (expiryTimer <= 0) {
      setErrorMessage('Your verification code has expired. Please click "Resend Code" below.');
      return;
    }

    setErrorMessage('');
    setVerifyLoading(true);

    try {
      await onVerify(fullOtp);
      setIsSuccess(true);
      setSuccessMessage('Code verified successfully! Signing you in...');
    } catch (err) {
      setErrorMessage(err.message || 'Incorrect verification code. Please check and try again.');
      // Auto-focus first input on error
      inputRefs.current[0]?.focus();
    } finally {
      setVerifyLoading(false);
    }
  };

  // Request fresh OTP
  const handleResend = async () => {
    if (cooldownTimer > 0 || resendLoading) return;

    setResendLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await onResend();
      setSuccessMessage(res?.message || 'A fresh verification code has been sent to your email.');
      setOtpDigits(['', '', '', '', '', '']);
      setCooldownTimer(res?.resendCooldownSeconds || 60);
      setExpiryTimer(res?.expiresInSeconds || 300);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to resend verification code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const isOtpComplete = otpDigits.every((d) => d !== '');

  return (
    <div className="w-full bg-white rounded-[24px] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Top back navigation */}
      <button
        type="button"
        onClick={onBackToLogin}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#686975] hover:text-[#10102F] mb-5 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Login</span>
      </button>

      {/* Brand Icon & Heading */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] text-[#5968F5] flex items-center justify-center mx-auto mb-3 shadow-xs border border-[#5968F5]/20">
          <ShieldCheck className="w-7 h-7" />
        </div>
        
        <h3 className="text-[26px] font-extrabold text-[#10102F] tracking-tight">
          Verify Your Email
        </h3>
        
        <p className="text-xs sm:text-sm text-[#686975] mt-1.5 max-w-[380px] mx-auto leading-relaxed">
          We've sent a one-time verification code to your registered email address. Enter the code below to securely access your Mendx account.
        </p>

        {/* Masked Email Pill */}
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-[#FAF7F3] border border-[#E7E7EB] text-xs font-semibold text-[#10102F]">
          <Mail className="w-3.5 h-3.5 text-[#5968F5]" />
          <span>{maskedEmail || 'your email'}</span>
        </div>
      </div>

      {/* Inline Feedback Alerts */}
      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-[#FFF2F0] border border-[#FFCCC7] flex items-start gap-2.5 text-[#CF1322] text-xs font-medium animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#F5222D]" />
          <div className="flex-1">{errorMessage}</div>
        </div>
      )}

      {successMessage && !errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-[#F6FFED] border border-[#B7EB8F] flex items-start gap-2.5 text-[#389E0D] text-xs font-medium animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#52C41A]" />
          <div className="flex-1">{successMessage}</div>
        </div>
      )}

      {/* 6-Digit OTP Boxes */}
      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label className="block text-center text-xs font-bold uppercase tracking-wider text-[#10102F] mb-3">
            Enter 6-Digit Verification Code
          </label>
          
          <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={verifyLoading || isSuccess}
                className={`w-11 h-13 sm:w-13 sm:h-14 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border transition-all duration-150 ${
                  digit
                    ? 'border-[#5968F5] bg-[#F4F5FF] text-[#10102F] shadow-xs ring-2 ring-[#5968F5]/20'
                    : 'border-[#E7E7EB] bg-[#FAF7F3] text-[#10102F] focus:border-[#5968F5] focus:bg-white focus:ring-2 focus:ring-[#5968F5]/30'
                } ${errorMessage ? 'border-[#FF7875] bg-[#FFF1F0]' : ''}`}
                autoComplete="off"
              />
            ))}
          </div>
        </div>

        {/* Expiry Timer Countdown */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#686975]">
          <Clock className="w-3.5 h-3.5 text-[#5968F5]" />
          <span>Code expires in:</span>
          <span className={`font-mono font-bold ${expiryTimer < 60 ? 'text-[#FF4D4F]' : 'text-[#10102F]'}`}>
            {formatTime(expiryTimer)}
          </span>
          {expiryTimer === 0 && (
            <span className="text-xs font-bold text-[#FF4D4F] ml-1">(Expired)</span>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={verifyLoading || !isOtpComplete || expiryTimer === 0 || isSuccess}
          className="w-full h-12 bg-[#5968F5] hover:bg-[#4351DB] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#5968F5]/25"
        >
          {verifyLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Code...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#24C99A]" />
              <span>Verified! Entering Mendx...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Verify & Sign In</span>
            </>
          )}
        </button>

        {/* Resend Cooldown Controls & Change Email */}
        <div className="pt-2 border-t border-[#F0F2F5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#686975]">
            Didn't receive the code?
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={cooldownTimer > 0 || resendLoading || isSuccess}
            className={`font-bold transition-colors inline-flex items-center gap-1.5 ${
              cooldownTimer > 0 || resendLoading || isSuccess
                ? 'text-[#92939C] cursor-not-allowed'
                : 'text-[#5968F5] hover:underline'
            }`}
          >
            {resendLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Resending...</span>
              </>
            ) : cooldownTimer > 0 ? (
              <span>Resend code in {cooldownTimer}s</span>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend OTP</span>
              </>
            )}
          </button>
        </div>

        {/* Change email button */}
        <div className="text-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-xs text-[#686975] hover:text-[#5968F5] font-semibold underline underline-offset-2 transition-colors"
          >
            Wrong email address? Change email
          </button>
        </div>
      </form>

    </div>
  );
}

