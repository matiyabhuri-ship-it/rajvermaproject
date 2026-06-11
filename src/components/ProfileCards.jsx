import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCards = () => {
  // Base array of diverse profiles
  const baseProfiles = [
    { name: "Shivani", age: 26, gender: "Female", religion: "Hindu", image: "https://images.unsplash.com/photo-1546944621-e83d8e57f202?w=400&h=500&fit=crop" },
    { name: "Rohan", age: 29, gender: "Male", religion: "Hindu", image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=500&fit=crop" },
    { name: "Ayesha", age: 25, gender: "Female", religion: "Muslim", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" },
    { name: "Arjun", age: 30, gender: "Male", religion: "Sikh", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop" },
    { name: "Priya", age: 27, gender: "Female", religion: "Hindu", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" },
    { name: "Daniel", age: 31, gender: "Male", religion: "Christian", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" },
    { name: "Sneha", age: 24, gender: "Female", religion: "Hindu", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop" },
    { name: "Kabir", age: 28, gender: "Male", religion: "Muslim", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
    { name: "Simran", age: 27, gender: "Female", religion: "Sikh", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop" },
    { name: "Vikram", age: 32, gender: "Male", religion: "Hindu", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop" }
  ];

  const surnames = ["Sharma", "Verma", "Khan", "Singh", "Patel", "Raj", "Gupta", "Kumar", "Das", "Joshi"];
  const professions = ["Software Engineer", "Doctor", "Business Analyst", "Marketing Manager", "Entrepreneur", "Architect", "Designer", "Banker"];

  // Generate exactly 50 cards by iterating
  const profiles = Array.from({ length: 50 }, (_, i) => {
    const base = baseProfiles[i % baseProfiles.length];
    const surname = surnames[i % surnames.length];

    return {
      id: i + 1,
      name: `${base.name} ${surname}`,
      age: base.age + (i % 4) - 1, // Slight age variation
      gender: base.gender,
      religion: base.religion,
      profession: professions[i % professions.length],
      image: base.image,
      gallery: [
        base.image,
        "https://images.unsplash.com/photo-1444418185997-1145401101e0?auto=format&fit=crop&q=80&w=400&h=500",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400&h=500",
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400&h=500"
      ]
    };
  });

  const navigate = useNavigate();

  // Category State
  const [filter, setFilter] = useState('All');

  // Filter profiles based on selected category
  const displayedProfiles = filter === 'All'
    ? profiles
    : profiles.filter(p => p.gender === filter);

  return (
    <div className="w-full px-4 md:px-6 py-20 bg-[#faf7f5]">
      <div className="max-w-[1600px] mx-auto">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-serif text-rose-900 mb-4 tracking-wide">Featured Matches</h2>
          <div className="w-20 h-px bg-rose-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-light text-sm md:text-base tracking-[0.2em] uppercase">
            Find your perfect life partner
          </p>
        </div>

        {/* Categories / Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mb-14">
          <button
            onClick={() => setFilter('All')}
            className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm
               ${filter === 'All' ? 'bg-rose-800 text-white shadow-rose-900/30 ring-2 ring-rose-800 ring-offset-2 ring-offset-[#faf7f5]' : 'bg-white text-rose-800 border border-rose-200 hover:bg-rose-50'}`}
          >
            All Matches
          </button>
          <button
            onClick={() => setFilter('Male')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm
               ${filter === 'Male' ? 'bg-blue-600 text-white shadow-blue-600/30 ring-2 ring-blue-600 ring-offset-2 ring-offset-[#faf7f5]' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'}`}
          >
            Male
          </button>
          <button
            onClick={() => setFilter('Female')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm
               ${filter === 'Female' ? 'bg-rose-600 text-white shadow-rose-600/30 ring-2 ring-rose-600 ring-offset-2 ring-offset-[#faf7f5]' : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50'}`}
          >
            Female
          </button>
        </div>

        {/* 
          Grid Layout: exactly 7 cards per row on desktop (lg:grid-cols-7)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
          {displayedProfiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => navigate(`/profile/${profile.id}`, { state: { profile } })}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 border border-rose-100 flex flex-col group cursor-pointer"
            >
              {/* Top: Profile Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>

                {/* Name hovering over image */}
                <div className="absolute bottom-0 w-full p-4 pt-12 text-white">
                  <h3 className="font-serif font-bold text-lg md:text-xl leading-tight drop-shadow-md truncate">
                    {profile.name}
                  </h3>
                </div>
              </div>

              {/* Bottom: Profile Details */}
              <div className="p-4 bg-white text-sm flex-grow flex flex-col justify-between">

                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-medium text-sm">
                    {profile.age} Yrs
                  </span>
                  <span className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold tracking-wider uppercase
                    ${profile.gender === 'Female' ? 'text-rose-600 bg-rose-50' : 'text-blue-600 bg-blue-50'}
                  `}>
                    {profile.gender}
                  </span>
                </div>

                <div className="flex items-center pt-3 border-t border-gray-100/80">
                  <span className="text-gray-500 font-medium flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${profile.religion === 'Hindu' ? 'bg-amber-500' : profile.religion === 'Muslim' ? 'bg-green-500' : profile.religion === 'Christian' ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                    {profile.religion}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-6 tracking-wide font-medium">Showing {displayedProfiles.length} Profiles</p>
          <button className="px-8 py-3 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-full font-medium tracking-widest uppercase transition-all duration-500 hover:shadow-lg">
            Load More Matches
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileCards;
