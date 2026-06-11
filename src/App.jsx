import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProfileDetail from './pages/ProfileDetail'
import ExploreProfiles from './pages/ExploreProfiles'
import Login from './pages/Login'
import Register from './pages/Register'
import MyProfile from './pages/MyProfile'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#faf7f5] overflow-x-hidden">
        {/* Navbar is outside Routes so it persists across all pages */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreProfiles />} />
          <Route path="/profile/me" element={<MyProfile />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
