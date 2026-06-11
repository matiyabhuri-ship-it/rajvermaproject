import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, User, Heart, MessageCircle, Briefcase, Check } from 'lucide-react'

const ProfileDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Extract profile data passed via router state
  const profile = location.state?.profile;

  // Selected image state for the gallery tracker
  const [mainImage, setMainImage] = useState(profile?.image || '');

  // Requested state for send interest button
  const [isRequested, setIsRequested] = useState(false);

  // Scroll to top automatically when this page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!profile) {
    return (
      <div className="pt-32 text-center h-screen flex flex-col items-center justify-center bg-[#faf7f5]">
        <h2 className="text-3xl font-serif text-gray-800 mb-4">Profile Not Found</h2>
        <p className="text-gray-500 mb-8">We couldn't find the requested matchmaking profile.</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-rose-700 text-white rounded-full uppercase tracking-widest text-sm font-medium hover:bg-rose-800 transition-colors">
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-4 md:px-8 bg-[#faf7f5] min-h-screen">
      
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-rose-700 hover:text-rose-900 mb-8 transition-colors group tracking-widest uppercase text-sm font-medium"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Matches
      </button>

      {/* Main Detail Card Layout */}
      <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-rose-50 flex flex-col lg:flex-row">
         
         {/* Left Side: Image Gallery */}
         <div className="lg:w-1/2 bg-rose-50 p-6 md:p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-rose-100 gap-6">
           
           {/* Current Main Display Image */}
           <div className="relative w-full max-w-md aspect-[4/5] rounded-[24px] overflow-hidden shadow-lg border-2 border-white block">
             <img 
               src={mainImage} 
               alt={profile.name} 
               className="w-full h-full object-cover filter contrast-105 transition-all duration-300 ease-in-out" 
             />
           </div>

           {/* Thumbnails Row */}
           <div className="flex gap-4 w-full max-w-md overflow-x-auto pb-2">
             {profile.gallery && profile.gallery.map((imgUrl, index) => (
                <div 
                  key={index}
                  onClick={() => setMainImage(imgUrl)}
                  className={`w-20 h-24 md:w-24 md:h-28 flex-shrink-0 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:-translate-y-1 ${mainImage === imgUrl ? 'border-rose-500 shadow-md scale-105' : 'border-transparent filter brightness-75 hover:brightness-100'}`}
                >
                  <img src={imgUrl} alt={`gallery-${index}`} className="w-full h-full object-cover" />
                </div>
             ))}
           </div>
         </div>
         
         {/* Right Side: Information & Action Buttons */}
         <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            
            {/* Header section */}
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-3">{profile.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <p className="text-lg text-rose-600 font-semibold tracking-widest uppercase">
                {profile.age} Years • {profile.gender}
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:block"></span>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${profile.religion === 'Hindu' ? 'bg-amber-500' : profile.religion === 'Muslim' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                {profile.religion}
              </p>
            </div>

            <div className="w-16 h-px bg-rose-200 mb-8"></div>

            {/* Profile Bio Details */}
            <div className="space-y-8 text-gray-700">
               <div>
                 <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
                   <User size={14} className="text-rose-400"/>
                   About Profile
                 </h3>
                 <p className="leading-relaxed font-light text-gray-600 text-[15px] md:text-base">
                   {profile.name} is looking for a kind-hearted and understanding life partner. Believes in mutual respect, maintaining a healthy lifestyle, and building a beautiful life together based on trust and communication.
                 </p>
               </div>
               
               <div>
                 <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
                   <Briefcase size={14} className="text-rose-400"/>
                   Education & Profession
                 </h3>
                 <p className="leading-relaxed font-semibold text-gray-700 text-[15px] md:text-base">
                   {profile.profession || "Working Professional"}
                 </p>
               </div>
               
               <div>
                 <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3 flex items-center gap-2">
                   <Heart size={14} className="text-rose-400"/>
                   Lifestyle & Interests
                 </h3>
                 <div className="flex flex-wrap gap-2">
                   {['Traveling', 'Music', 'Fitness', 'Family Oriented'].map((tag, i) => (
                     <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-500 uppercase tracking-widest">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsRequested(true)}
                disabled={isRequested}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold uppercase tracking-widest transition-all ${
                  isRequested 
                    ? 'bg-green-600 text-white cursor-not-allowed shadow-md' 
                    : 'bg-rose-700 text-white hover:bg-rose-800 shadow-lg hover:shadow-rose-900/30 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isRequested ? (
                  <>
                    <Check size={18} />
                    Requested
                  </>
                ) : (
                  <>
                    <MessageCircle size={18} />
                    Send Interest
                  </>
                )}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-rose-300 text-rose-700 rounded-full font-bold uppercase tracking-widest hover:bg-rose-50 transition-colors">
                <Heart size={18} />
                Shortlist
              </button>
            </div>
            
         </div>
      </div>
    </div>
  )
}

export default ProfileDetail;
