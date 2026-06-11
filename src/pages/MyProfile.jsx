import React, { useState, useEffect } from 'react';
import { Camera, Save, UploadCloud, X, Edit3, MapPin, Briefcase, Mail, Phone, Bell, User } from 'lucide-react';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    name: '', fatherName: '', motherName: '', age: '', gender: 'Male', status: 'Never Married',
    religion: 'Hindu', caste: '', education: '', occupation: '', mobile: '', email: '',
    country: 'India', state: '', district: '', thana: '', village: '', pincode: '',
    landmark: '', address: '', aboutProfile: ''
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // New States for View/Edit Switch and Tabs
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'notifications'

  // Load from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setFormData(JSON.parse(savedProfile));
        setIsEditing(false); // Valid profile exists, show view mode
      } catch (err) {
        console.error("Failed to parse saved profile", err);
      }
    } else {
      // Dummy content if nothing saved
      setFormData({
        name: 'Rahul Sharma', fatherName: 'Rakesh Sharma', motherName: 'Sunita Sharma', age: '28',
        gender: 'Male', status: 'Never Married', religion: 'Hindu', caste: 'Brahmin',
        education: 'B.Tech in Computer Science', occupation: 'Software Engineer', mobile: '9876543210',
        email: 'rahul.s@example.com', country: 'India', state: 'Delhi', district: 'New Delhi',
        thana: 'Vasant Vihar', village: 'Vasant Vihar', pincode: '110057', landmark: 'Near Metro Station',
        address: 'Block A, Vasant Vihar Enclave, New Delhi',
        aboutProfile: 'I am a software developer working in a top MNC. Looking for an understanding and supportive partner.'
      });
      setIsEditing(true); // First time, show form
    }

    const savedImages = localStorage.getItem('userProfileImages');
    if (savedImages) {
      try {
        setImagePreviews(JSON.parse(savedImages));
      } catch (err) {
        console.error(err);
      }
    } else {
      setImagePreviews(["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"]);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const remainingSlots = 4 - imagePreviews.length;
      const filesToAdd = filesArray.slice(0, remainingSlots);

      if (filesToAdd.length > 0) {
        setImages([...images, ...filesToAdd]);
        const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...newPreviews]);
      }
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    try {
      localStorage.setItem('userProfileImages', JSON.stringify(imagePreviews));
    } catch(err) {
      console.warn("Images too large to save in local storage.", err);
    }
    setIsEditing(false); // Hide the form and show the generated profile!
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert("Profile Saved!");
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-[#faf7f5]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium tracking-wide transition-all ${activeTab === 'profile' ? 'bg-rose-800 text-white shadow-lg shadow-rose-900/30' : 'bg-white text-gray-600 border border-gray-200 hover:bg-rose-50'}`}
          >
            <User className="w-5 h-5" /> My Profile
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium tracking-wide transition-all ${activeTab === 'notifications' ? 'bg-rose-800 text-white shadow-lg shadow-rose-900/30' : 'bg-white text-gray-600 border border-gray-200 hover:bg-rose-50'}`}
          >
            <Bell className="w-5 h-5" /> Notifications
            <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">3</span>
          </button>
        </div>

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100 p-8 md:p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif text-rose-900 mb-6 border-b border-rose-50 pb-4">Recent Notifications</h2>
            <div className="space-y-4">
              <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 flex gap-4 items-start">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Profile Approved!</h4>
                  <p className="text-sm text-gray-600 mt-1">Your registered profile has been successfully approved and is now visible to matches.</p>
                  <span className="text-xs text-gray-400 mt-2 block">2 hours ago</span>
                </div>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-start hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya viewed your profile</h4>
                  <p className="text-sm text-gray-600 mt-1">Priya sent you an interest request. Check out her profile to respond.</p>
                  <span className="text-xs text-gray-400 mt-2 block">1 day ago</span>
                </div>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4 items-start">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Complete your profile</h4>
                  <p className="text-sm text-gray-600 mt-1">Add more photos to increase your chances of finding a perfect match.</p>
                  <span className="text-xs text-gray-400 mt-2 block">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100">
            {isEditing ? (
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-8 border-b border-rose-50 pb-6">
                  <div>
                    <h2 className="text-2xl font-serif text-gray-800">Edit Profile</h2>
                    <p className="text-gray-500 text-sm mt-1">Update your personal information below</p>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* FORM START */}
                <form onSubmit={handleSave} className="space-y-10">
                  
                  {/* Section 1: Personal & Family Details */}
                  <div>
                    <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-6">Personal & Family Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Father's Name</label>
                        <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Mother's Name</label>
                        <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Marital Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required>
                          <option value="Never Married">Never Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Religion</label>
                        <select name="religion" value={formData.religion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required>
                          <option value="Hindu">Hindu</option>
                          <option value="Muslim">Muslim</option>
                          <option value="Christian">Christian</option>
                          <option value="Sikh">Sikh</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Caste</label>
                        <input type="text" name="caste" value={formData.caste} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Education & Professional */}
                  <div>
                    <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-6">Education & Career</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Education</label>
                        <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Occupation / Profession</label>
                        <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Contact & Location */}
                  <div>
                    <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-6">Contact & Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Mobile Number</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">District</label>
                        <input type="text" name="district" value={formData.district} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Thana (Police Station)</label>
                        <input type="text" name="thana" value={formData.thana} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Village / City</label>
                        <input type="text" name="village" value={formData.village} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Pincode</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Address</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm resize-none" required></textarea>
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Landmark</label>
                        <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Bio */}
                  <div>
                    <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-6">About My Profile</h3>
                    <div>
                      <textarea name="aboutProfile" value={formData.aboutProfile} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm resize-none" required></textarea>
                    </div>
                  </div>

                  {/* Section 5: Photo Upload */}
                  <div>
                    <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-4">My Photos <span className="text-sm font-normal text-gray-500">(Max 4)</span></h3>
                    <div className="mt-2 flex justify-center rounded-xl border border-dashed border-rose-300 px-6 py-8 bg-rose-50/50 hover:bg-rose-50 transition-colors">
                      <div className="text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-rose-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white px-3 py-1 font-semibold text-rose-600 shadow-sm border border-rose-100 hover:bg-rose-50 transition-colors">
                            <span>Upload more files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} disabled={imagePreviews.length >= 4} />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {imagePreviews.map((src, index) => (
                          <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-[3/4] shadow-sm">
                            <img src={src} alt="profile" className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex gap-4 justify-end">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="flex items-center justify-center gap-2 px-10 py-3 bg-rose-700 text-white rounded-full font-semibold tracking-widest uppercase hover:bg-rose-800 transition-all shadow-lg shadow-rose-700/30">
                      <Save className="w-4 h-4" /> Save
                    </button>
                  </div>
                </form>
                {/* FORM END */}
              </div>
            ) : (
              // READ-ONLY DASHBOARD VIEW (Shown after save)
              <div>
                <div className="relative h-48 md:h-64 bg-amber-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-900 to-amber-800 opacity-90"></div>
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
                </div>
                
                <div className="px-8 md:px-12 pb-12 relative -mt-20 md:-mt-24">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    {/* Profile Picture */}
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl border-4 border-white shadow-xl overflow-hidden bg-white shrink-0">
                      <img src={imagePreviews[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Name and Basic Info */}
                    <div className="pt-2 md:pt-28 flex-1 w-full">
                      <div className="flex justify-between items-start w-full">
                        <div>
                          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold">{formData.name}</h1>
                          <p className="text-rose-600 font-medium tracking-wide mt-1 uppercase text-sm">{formData.occupation}</p>
                        </div>
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-full font-medium transition-colors text-sm shrink-0"
                        >
                          <Edit3 className="w-4 h-4" /> Edit Profile
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-6">
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                          <MapPin className="w-4 h-4 text-gray-400" /> {formData.district}, {formData.state}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                          <Briefcase className="w-4 h-4 text-gray-400" /> {formData.education}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                          <User className="w-4 h-4 text-gray-400" /> {formData.age} Yrs • {formData.gender}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rest of Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                    <div>
                      <h3 className="font-serif text-xl border-b border-gray-100 pb-3 mb-4 text-gray-800">About Me</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{formData.aboutProfile}</p>
                      
                      <h3 className="font-serif text-xl border-b border-gray-100 pb-3 mt-10 mb-4 text-gray-800">Personal Details</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"><span className="text-gray-500">Marital Status</span> <span className="font-medium text-gray-800">{formData.status}</span></li>
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"><span className="text-gray-500">Religion</span> <span className="font-medium text-gray-800">{formData.religion}</span></li>
                        <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"><span className="text-gray-500">Caste</span> <span className="font-medium text-gray-800">{formData.caste}</span></li>
                        <li className="flex justify-between items-center text-sm"><span className="text-gray-500">Father's Name</span> <span className="font-medium text-gray-800">{formData.fatherName}</span></li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl border-b border-gray-100 pb-3 mb-4 text-gray-800">Contact Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email Address</p>
                            <p className="text-sm font-medium text-gray-800">{formData.email || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <Phone className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mobile Number</p>
                            <p className="text-sm font-medium text-gray-800">{formData.mobile || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Full Address</p>
                            <p className="text-sm font-medium text-gray-800 leading-snug">{formData.address}, {formData.village}, {formData.district}, {formData.state} - {formData.pincode}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery inside View Profile */}
                  {imagePreviews.length > 1 && (
                    <div className="mt-12">
                      <h3 className="font-serif text-xl border-b border-gray-100 pb-3 mb-6 text-gray-800">My Photos</h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                        {imagePreviews.slice(1).map((src, idx) => (
                           <div key={idx} className="w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                             <img src={src} className="w-full h-full object-cover" alt="Gallery" />
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
