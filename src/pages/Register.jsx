import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, UploadCloud, X } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    age: '',
    gender: '',
    status: '', // Marital Status
    religion: '',
    caste: '',
    education: '',
    occupation: '',
    mobile: '',
    email: '',
    password: '',
    country: 'India',
    state: '',
    district: '',
    thana: '',
    village: '',
    pincode: '',
    landmark: '',
    address: '',
    aboutProfile: ''
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const remainingSlots = 4 - images.length;
      const filesToAdd = filesArray.slice(0, remainingSlots);

      if (filesToAdd.length > 0) {
        const newImages = [...images, ...filesToAdd];
        setImages(newImages);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to LocalStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    try {
      localStorage.setItem('userProfileImages', JSON.stringify(imagePreviews));
    } catch(err) {
      console.warn("Images too large for localStorage", err);
    }

    // Auto login
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('authChange'));

    alert("Profile Created Successfully!");
    navigate('/profile/me');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center relative overflow-hidden bg-rose-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 w-full max-w-5xl px-4 md:px-8">
        {/* Glass Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 md:p-12">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <span className="text-4xl font-serif italic text-rose-800 tracking-wider flex items-center gap-2">
                  S <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" /> R
                </span>
              </Link>
            </div>

            <h2 className="text-3xl font-serif text-center text-gray-800 mb-2">Create Your Profile</h2>
            <p className="text-center text-gray-500 text-sm mb-10 font-light tracking-wide">Provide your details to find your perfect match</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Personal & Family Details */}
              <div>
                <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-4">Personal & Family Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" placeholder="e.g. Rahul Sharma" required />
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
                      <option value="" disabled>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Marital Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required>
                      <option value="" disabled>Select</option>
                      <option value="Never Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Religion</label>
                    <select name="religion" value={formData.religion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required>
                      <option value="" disabled>Select</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Sikh">Sikh</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Caste</label>
                    <input type="text" name="caste" value={formData.caste} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" placeholder="e.g. Rajput, Brahmin" required />
                  </div>
                </div>
              </div>

              {/* Section 2: Education & Professional */}
              <div>
                <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-4">Education & Career</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Education</label>
                    <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" placeholder="e.g. B.Tech, MBA" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Occupation / Profession</label>
                    <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" placeholder="e.g. Software Engineer" required />
                  </div>
                </div>
              </div>

              {/* Section 3: Contact & Location */}
              <div>
                <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-4">Contact & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Mobile Number</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" placeholder="Create a password" required />
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
                    <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm" placeholder="Near by place" />
                  </div>
                </div>
              </div>

              {/* Section 4: Bio */}
              <div>
                <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-4">About the Profile</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Describe Yourself (Expectations, Hobbies, etc.)</label>
                  <textarea name="aboutProfile" value={formData.aboutProfile} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm resize-none" placeholder="Write a few words about yourself and what you are looking for..." required></textarea>
                </div>
              </div>

              {/* Section 5: Photo Upload */}
              <div>
                <h3 className="text-lg font-serif text-rose-800 border-b border-rose-100 pb-2 mb-4">Profile Photos <span className="text-sm font-normal text-gray-500">(Max 4)</span></h3>
                
                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-rose-300 px-6 py-8 bg-rose-50/50 hover:bg-rose-50 transition-colors">
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-rose-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white px-3 py-1 font-semibold text-rose-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-rose-600 focus-within:ring-offset-2 hover:text-rose-500 shadow-sm border border-rose-100">
                        <span>Upload files</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleImageChange} disabled={images.length >= 4} />
                      </label>
                      <p className="pl-2 pt-1 font-medium">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 w-24 h-24 shadow-sm">
                        <img src={src} alt="preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform scale-75"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full block md:w-1/2 mx-auto py-4 bg-rose-700 text-white rounded-full font-bold tracking-widest uppercase hover:bg-rose-800 transition-all shadow-xl shadow-rose-700/30 transform hover:-translate-y-1">
                  Create Profile
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-rose-600 font-semibold hover:text-rose-800">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
