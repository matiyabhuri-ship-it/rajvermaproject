import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('authChange'));
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-3xl md:text-4xl font-serif italic text-rose-800 tracking-wider flex items-center gap-2">
              S <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-400 fill-rose-400" /> R
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            <Link to="/" className="nav-link text-gray-800 hover:text-rose-700 uppercase text-xs md:text-sm tracking-[0.2em] font-medium transition-colors">Home</Link>
            <a href="#" className="nav-link text-gray-800 hover:text-rose-700 uppercase text-xs md:text-sm tracking-[0.2em] font-medium transition-colors">Our Story</a>
            <Link to="/explore" className="nav-link text-gray-800 hover:text-rose-700 uppercase text-xs md:text-sm tracking-[0.2em] font-medium transition-colors">Explore Profiles</Link>
            <a href="#" className="nav-link text-gray-800 hover:text-rose-700 uppercase text-xs md:text-sm tracking-[0.2em] font-medium transition-colors">Gallery</a>
          </div>

          {/* RSVP/Login Button */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1 bg-rose-50 border border-rose-200 rounded-full hover:bg-rose-100 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 bg-rose-200 text-rose-800 rounded-full flex items-center justify-center font-bold font-serif text-sm">
                    U
                  </div>
                  <span className="text-sm font-medium pr-3 text-rose-800">My Profile</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-rose-100 rounded-xl shadow-xl py-2 z-50 overflow-hidden backdrop-blur-md">
                    <Link to="/profile/me" onClick={() => setIsProfileDropdownOpen(false)} className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors border-b border-rose-50">View Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-6 py-2.5 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-500 hover:shadow-md">
                  Login
                </Link>
                <Link to="/register" className="px-6 py-2.5 bg-rose-700 text-white hover:bg-rose-800 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-500 shadow-md shadow-rose-700/30">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-800 hover:text-rose-700 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xl transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 top-[80px]' : 'max-h-0 opacity-0 top-[70px] pointer-events-none overflow-hidden'}`}>
        <div className="px-6 py-6 space-y-5 text-center">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-800 hover:text-rose-700 uppercase tracking-widest text-sm font-medium transition-colors">Home</Link>
          <a href="#" className="block text-gray-800 hover:text-rose-700 uppercase tracking-widest text-sm font-medium transition-colors">Our Story</a>
          <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-800 hover:text-rose-700 uppercase tracking-widest text-sm font-medium transition-colors">Explore Profiles</Link>
          <a href="#" className="block text-gray-800 hover:text-rose-700 uppercase tracking-widest text-sm font-medium transition-colors">Gallery</a>
          <div className="pt-6 border-t border-rose-100 flex flex-col gap-3 items-center">
            {isLoggedIn ? (
              <>
                <Link to="/profile/me" onClick={() => setIsMobileMenuOpen(false)} className="inline-block w-full max-w-[200px] px-8 py-3 bg-rose-50 border border-rose-200 text-rose-700 font-medium tracking-widest uppercase rounded-full hover:bg-rose-100 transition-colors text-center">
                  My Profile
                </Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="inline-block w-full max-w-[200px] px-8 py-3 bg-red-50 text-red-600 font-medium tracking-widest uppercase rounded-full hover:bg-red-100 transition-colors shadow-sm text-center">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="inline-block w-full max-w-[200px] px-8 py-3 bg-white border border-rose-200 text-rose-700 font-medium tracking-widest uppercase rounded-full hover:bg-rose-50 transition-colors text-center">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="inline-block w-full max-w-[200px] px-8 py-3 bg-rose-700 text-white font-medium tracking-widest uppercase rounded-full hover:bg-rose-800 transition-colors shadow-md text-center">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
