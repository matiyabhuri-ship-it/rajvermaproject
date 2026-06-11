import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreProfiles = () => {
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
  const occupations = ["Software Engineer", "Doctor", "Business Analyst", "Marketing Manager", "Entrepreneur", "Architect", "Designer", "Banker", "Teacher", "CA"];
  const castes = ["Brahmin", "Rajput", "Bania", "Yadav", "Jat", "Kayastha", "Arora", "Not Specified"];
  const educations = ["B.Tech", "M.Tech", "MBA", "MBBS", "B.Com", "M.Com", "Ph.D", "B.A", "M.A"];
  const maritalStatuses = ["Never Married", "Divorced", "Widowed", "Awaiting Divorce"];

  // Generate larger array of profiles
  const profiles = Array.from({ length: 50 }, (_, i) => {
    const base = baseProfiles[i % baseProfiles.length];
    const surname = surnames[i % surnames.length];
    
    return {
      id: i + 1,
      name: `${base.name} ${surname}`,
      age: base.age + (i % 7) - 2, // Wider age range 22-38 approximately
      gender: base.gender,
      religion: base.religion,
      caste: castes[i % castes.length],
      education: educations[i % educations.length],
      occupation: occupations[i % occupations.length],
      maritalStatus: maritalStatuses[i % maritalStatuses.length],
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

  // State for all filters
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [religionFilter, setReligionFilter] = useState('All');
  const [casteFilter, setCasteFilter] = useState('All');
  const [maritalStatusFilter, setMaritalStatusFilter] = useState('All');
  const [educationFilter, setEducationFilter] = useState('All');
  const [occupationFilter, setOccupationFilter] = useState('All');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  // Filter profiles
  const displayedProfiles = profiles.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGender = genderFilter === 'All' || p.gender === genderFilter;
    const matchReligion = religionFilter === 'All' || p.religion === religionFilter;
    const matchCaste = casteFilter === 'All' || p.caste === casteFilter;
    const matchMarital = maritalStatusFilter === 'All' || p.maritalStatus === maritalStatusFilter;
    const matchEducation = educationFilter === 'All' || p.education === educationFilter;
    const matchOccupation = occupationFilter === 'All' || p.occupation === occupationFilter;
    const matchMinAge = minAge === '' || p.age >= parseInt(minAge);
    const matchMaxAge = maxAge === '' || p.age <= parseInt(maxAge);

    return matchSearch && matchGender && matchReligion && matchCaste && matchMarital && matchEducation && matchOccupation && matchMinAge && matchMaxAge;
  });

  return (
    <div className="w-full px-4 md:px-6 py-32 bg-[#faf7f5] min-h-screen">
      <div className="max-w-[1600px] mx-auto">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-serif text-rose-900 mb-6 tracking-wide">Explore Profiles</h1>
          <div className="w-24 h-px bg-rose-400 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-light text-base md:text-lg tracking-[0.2em] uppercase">
            Find your perfect match
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-rose-100 mb-12">
          
          {/* Top Row: Search & Gender */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="w-full md:w-1/2">
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all text-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <span className="text-sm font-medium text-gray-600">Gender:</span>
              <select 
                value={genderFilter} 
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 text-sm bg-white cursor-pointer text-gray-700"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* Age Range */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Age Range</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                />
              </div>
            </div>

            {/* Marital Status */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Marital Status</label>
              <select 
                value={maritalStatusFilter} 
                onChange={(e) => setMaritalStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm bg-white"
              >
                <option value="All">Any Status</option>
                {maritalStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Religion */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Religion</label>
              <select 
                value={religionFilter} 
                onChange={(e) => setReligionFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm bg-white"
              >
                <option value="All">Any Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Sikh">Sikh</option>
                <option value="Christian">Christian</option>
              </select>
            </div>

            {/* Caste */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Caste</label>
              <select 
                value={casteFilter} 
                onChange={(e) => setCasteFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm bg-white"
              >
                <option value="All">Any Caste</option>
                {castes.map(caste => (
                  <option key={caste} value={caste}>{caste}</option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Education</label>
              <select 
                value={educationFilter} 
                onChange={(e) => setEducationFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm bg-white"
              >
                <option value="All">Any Education</option>
                {educations.map(edu => (
                  <option key={edu} value={edu}>{edu}</option>
                ))}
              </select>
            </div>

            {/* Occupation */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Occupation</label>
              <select 
                value={occupationFilter} 
                onChange={(e) => setOccupationFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm bg-white"
              >
                <option value="All">Any Occupation</option>
                {occupations.map(occ => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

          </div>
          
          <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
             <span className="text-sm text-gray-600 font-medium">Found: {displayedProfiles.length} Profiles</span>
             <button 
               onClick={() => {
                 setSearchTerm('');
                 setGenderFilter('All');
                 setReligionFilter('All');
                 setCasteFilter('All');
                 setMaritalStatusFilter('All');
                 setEducationFilter('All');
                 setOccupationFilter('All');
                 setMinAge('');
                 setMaxAge('');
               }}
               className="text-rose-600 text-sm font-semibold hover:text-rose-800 transition-colors"
             >
               Clear Filters
             </button>
          </div>
        </div>

        {/* Profiles Grid */}
        {displayedProfiles.length > 0 ? (
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

                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-gray-500 truncate"><span className="font-medium text-gray-700">Edu:</span> {profile.education}</p>
                    <p className="text-xs text-gray-500 truncate"><span className="font-medium text-gray-700">Occ:</span> {profile.occupation}</p>
                    <p className="text-xs text-gray-500 truncate"><span className="font-medium text-gray-700">Caste:</span> {profile.caste}</p>
                  </div>

                  <div className="flex items-center pt-3 border-t border-gray-100/80 justify-between">
                    <span className="text-gray-500 font-medium flex items-center gap-2 text-[11px] sm:text-xs">
                      <span className={`w-2 h-2 rounded-full ${profile.religion === 'Hindu' ? 'bg-amber-500' : profile.religion === 'Muslim' ? 'bg-green-500' : profile.religion === 'Christian' ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                      {profile.religion}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium px-1 bg-gray-50 rounded hidden sm:inline-block">
                      {profile.maritalStatus === 'Never Married' ? 'Unmarried' : profile.maritalStatus}
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-rose-100 shadow-sm">
            <h3 className="text-2xl font-serif text-gray-800 mb-2">No Profiles Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search term to find matches.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setGenderFilter('All');
                setReligionFilter('All');
                setCasteFilter('All');
                setMaritalStatusFilter('All');
                setEducationFilter('All');
                setOccupationFilter('All');
                setMinAge('');
                setMaxAge('');
              }}
              className="px-6 py-2.5 bg-rose-50 text-rose-700 rounded-full font-semibold hover:bg-rose-100 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ExploreProfiles;
