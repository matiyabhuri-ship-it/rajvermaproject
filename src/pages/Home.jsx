import React from 'react'
import HeroSlider from '../components/HeroSlider'
import ProfileCards from '../components/ProfileCards'

const Home = () => {
  return (
    <>
      {/* Hero section */}
      <HeroSlider />

      {/* Meet the Couple Section */}
      <ProfileCards />

      {/* Wedding Events Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">Wedding Events</h2>
        <div className="w-24 h-px bg-rose-300 mx-auto mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Haldi */}
          <div className="bg-white p-8 border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-serif text-amber-600 mb-2">Haldi</h3>
            <p className="tracking-widest uppercase text-xs text-gray-500 mb-4 border-b pb-4">Morning • 10:00 AM</p>
            <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
              Join us for the vibrant Haldi ceremony, filled with colors, joy, and blessings as we begin our wedding festivities.
            </p>
            <p className="font-medium text-gray-800 text-sm">Hotel Grand Taj, Delhi</p>
          </div>

          {/* Sangeet */}
          <div className="bg-white p-8 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-serif text-purple-700 mb-2">Sangeet</h3>
            <p className="tracking-widest uppercase text-xs text-gray-500 mb-4 border-b pb-4">Evening • 07:00 PM</p>
            <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
              Get ready for a night of music, dance, and celebration. Let's create unforgettable memories together on the dance floor.
            </p>
            <p className="font-medium text-gray-800 text-sm">Royal Banquet Hall, Delhi</p>
          </div>

          {/* Wedding */}
          <div className="bg-white p-8 border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-serif text-rose-800 mb-2">Wedding</h3>
            <p className="tracking-widest uppercase text-xs text-gray-500 mb-4 border-b pb-4">Night • 08:30 PM</p>
            <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed">
              The grand celebration where two families become one. Join us as we take our vows and start our forever journey.
            </p>
            <p className="font-medium text-gray-800 text-sm">ITC Maurya, New Delhi</p>
          </div>
        </div>
      </div>

      {/* Save the Date Banner */}
      <div className="bg-rose-900 text-white py-24 text-center px-4 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Are You Attending?</h2>
          <p className="text-rose-200 mb-10 text-lg font-light tracking-wide">Please let us know if you can make it to our special day before November 1st.</p>
          <button className="bg-white text-rose-900 px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-rose-50 transition-colors">
            RSVP Here
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
