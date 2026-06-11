import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Smartphone } from 'lucide-react';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      // Simulate sending OTP
      setOtpSent(true);
    } else {
      alert("Please enter a valid mobile number.");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate verifying OTP and logging in
    console.log("Verified OTP:", otp, "for mobile:", mobile);
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center relative overflow-hidden bg-rose-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-fuchsia-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Glass Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-10">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <span className="text-4xl font-serif italic text-rose-800 tracking-wider flex items-center gap-2">
                  S <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" /> R
                </span>
              </Link>
            </div>

            <h2 className="text-2xl font-serif text-center text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-center text-gray-500 text-sm mb-8 font-light tracking-wide">
              {otpSent ? "Enter the OTP sent to your mobile" : "Login with your mobile number"}
            </p>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-sm tracking-wide"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-rose-700 text-white rounded-xl font-medium tracking-widest uppercase hover:bg-rose-800 transition-colors shadow-lg shadow-rose-700/30"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 text-center">
                    Enter Verification Code
                  </label>
                  <div className="flex justify-center gap-2 mb-2">
                     <input 
                      type="text"
                      maxLength="6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-3/4 px-5 py-3 text-center tracking-[0.5em] text-lg rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all font-semibold"
                      placeholder="••••••"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button 
                      type="button" 
                      onClick={() => setOtpSent(false)} 
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Change Mobile Number
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-green-600 text-white rounded-xl font-medium tracking-widest uppercase hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30"
                >
                  Verify & Login
                </button>
                
                <div className="text-center pt-2 text-xs text-gray-500">
                  Didn't receive code? <button type="button" className="text-rose-600 hover:underline font-semibold ml-1">Resend OTP</button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
              Don't have an account? <Link to="/register" className="text-rose-600 font-semibold hover:text-rose-800">Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
