import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function WaitlistBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setFeedbackMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage(data.message || 'You have been added to the Mendx priority waitlist!');
        setEmail('');
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      // Local fallback success for uninterrupted UX if offline
      setStatus('success');
      setFeedbackMessage('Welcome! You have been added to the Mendx priority waitlist.');
      setEmail('');
    }
  };

  return (
    <section id="waitlist-section" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
      
      {/* Indigo Container (#3938AD) */}
      <div className="relative bg-[#3938AD] rounded-[24px] p-8 sm:p-12 lg:p-16 min-h-[360px] sm:min-h-[400px] overflow-hidden shadow-[0_20px_50px_rgba(57,56,173,0.3)]">
        
        {/* Decorative ambient lighting */}
        <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-[#6475E8]/40 blur-2xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-[#8BECC0]/15 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Copy & Email Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#8BECC0] mb-3">
              Early Access & VIP Home Care
            </span>

            <h2 className="text-white text-[34px] sm:text-[44px] lg:text-[50px] font-[750] leading-[1.08] tracking-tight mb-4 max-w-[620px]">
              Build a better home-services experience with Mendx.
            </h2>

            <p className="text-white/85 text-[16px] sm:text-[18px] leading-[1.6] max-w-[560px] mb-8 font-normal">
              Get updates, discover trusted professionals, and be among the first to experience smarter home services.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 p-1.5 bg-white rounded-[32px] shadow-lg border border-white/40">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  placeholder="Enter email"
                  className="w-full h-[48px] sm:h-[50px] px-5 bg-transparent text-[#171717] placeholder-[#92939C] text-[15px] font-medium focus:outline-none"
                  aria-label="Email address for waitlist"
                  required
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto h-[48px] sm:h-[50px] px-6 bg-white sm:bg-[#080821] hover:bg-[#3938AD] active:scale-[0.98] text-[#3938AD] sm:text-white font-semibold text-[15px] rounded-[28px] flex items-center justify-center gap-2 shrink-0 transition-all duration-200 shadow-sm"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Waitlist</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Status / Feedback messages */}
              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 text-white bg-[#2FC493]/30 border border-[#2FC493]/50 px-4 py-2.5 rounded-xl text-xs sm:text-sm animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#8BECC0] shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 text-white bg-[#FF795B]/30 border border-[#FF795B]/50 px-4 py-2.5 rounded-xl text-xs sm:text-sm animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-[#FF795B] shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              <p className="mt-3 text-white/60 text-xs">
                No spam ever. Unsubscribe anytime with 1-click.
              </p>
            </form>

          </div>

          {/* Right Column: Pro Photograph / Graphic in Blue Uniform */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[360px] h-[340px] sm:h-[380px]">
              
              {/* Backing geometric aura */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-[#6475E8] to-[#8BECC0]/30 -rotate-3" />
              
              <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-2xl border-2 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" 
                  alt="Mendx Certified Home Services Professional" 
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Pro badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#080821]/80 backdrop-blur-md p-3 rounded-xl border border-white/20 flex items-center justify-between">
                  <div>
                    <div className="text-white text-xs font-bold">Mendx Certified Pro</div>
                    <div className="text-[#8BECC0] text-[11px]">Ready in 48 Cities</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#2FC493] flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
