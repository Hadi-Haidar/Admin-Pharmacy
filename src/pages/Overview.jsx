// src/pages/Overview.jsx - Professional Welcome Experience with Carousel

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import {
  Store,
  Users,
  Package,
  Clock,
  ArrowRight,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

const Overview = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  // Update time and greeting
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let greetingText = '';
      
      if (hour >= 5 && hour < 12) greetingText = 'Good Morning';
      else if (hour >= 12 && hour < 17) greetingText = 'Good Afternoon';
      else if (hour >= 17 && hour < 22) greetingText = 'Good Evening';
      else greetingText = 'Good Night';
      
      setGreeting(greetingText);
      setCurrentTime(new Date());
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Carousel Section */}
      <div className="mb-8 mt-8 relative max-w-[90%] mx-auto">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          loop={true}
          className="h-[360px] md:h-[432px] rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Slide 1: Welcome Message */}
          <SwiperSlide>
            <div className="relative h-full bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
              {/* Pharmacy Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="pharmacy-pattern-1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                      <rect x="45" y="30" width="10" height="40" fill="white" opacity="0.3"/>
                      <rect x="30" y="45" width="40" height="10" fill="white" opacity="0.3"/>
                      <circle cx="20" cy="20" r="5" fill="white" opacity="0.2"/>
                      <circle cx="80" cy="80" r="4" fill="white" opacity="0.2"/>
                      <ellipse cx="70" cy="25" rx="8" ry="4" fill="white" opacity="0.2" transform="rotate(45 70 25)"/>
                      <path d="M 15 75 Q 15 80, 20 80 L 30 80 Q 35 80, 35 75 L 32 65 L 18 65 Z" fill="white" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#pharmacy-pattern-1)"/>
                </svg>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-5 transform -translate-x-1/2 translate-y-1/2"></div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Main Greeting */}
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {greeting}, <br className="md:hidden" />
                      {admin?.name || 'Administrator'}!
                    </h1>

                    <p className="text-lg md:text-xl text-emerald-50 mb-6 leading-relaxed max-w-3xl mx-auto">
                      Welcome to your Pharmacy Management Portal
                    </p>

                    {/* Time & Date Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {formatTime()} • {formatDate()}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2: Doctor Image */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://cdn.pixabay.com/photo/2023/09/20/07/36/doctor-8264057_1280.jpg"
                alt="Professional Healthcare"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Professional Healthcare Management
                    </h2>
                    <p className="text-base md:text-lg text-gray-200 mb-4 max-w-2xl">
                      Empowering pharmacies with cutting-edge technology for better patient care
                    </p>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      View Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3: Pharmacy Image */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src="https://www.kistmcth.edu.np/public/uploads/service/1693973243.jpg"
                alt="Modern Pharmacy"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Complete Inventory Control
                    </h2>
                    <p className="text-base md:text-lg text-gray-200 mb-4 max-w-2xl">
                      Streamline your pharmacy operations with our comprehensive management system
                    </p>
                    <button
                      onClick={() => navigate('/medicines')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Manage Medicines
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 group">
          <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 group">
          <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Welcome Information Card */}
      <div className="mb-8 mt-8 relative max-w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl p-6 md:p-9 shadow-2xl text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Your Control Center
                  </h2>
                  <p className="text-base md:text-lg text-emerald-50 leading-relaxed mb-5">
                    Manage your entire pharmacy network from one powerful platform. Access medicines, oversee pharmacy locations, and control user permissions with ease.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="px-5 py-2.5 bg-white text-emerald-600 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      View Dashboard
                    </button>
                    <button
                      onClick={() => navigate('/settings')}
                      className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>
                </div>

                {/* Professional Pill Bottle Illustration */}
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative"
                  >
                    <svg
                      width="252"
                      height="288"
                      viewBox="0 0 280 320"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="pill-bottle-svg drop-shadow-2xl"
                    >
                      {/* Pill Bottle Shadow */}
                      <ellipse cx="140" cy="305" rx="60" ry="8" fill="rgba(0,0,0,0.2)" />
                      
                      {/* Bottle Body */}
                      <rect x="80" y="80" width="120" height="200" rx="15" fill="white" opacity="0.95" />
                      
                      {/* Bottle Cap */}
                      <rect x="90" y="50" width="100" height="35" rx="8" fill="white" opacity="0.95" />
                      <rect x="95" y="40" width="90" height="15" rx="5" fill="#10b981" />
                      
                      {/* Cap Details */}
                      <line x1="100" y1="45" x2="100" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="110" y1="45" x2="110" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="120" y1="45" x2="120" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="130" y1="45" x2="130" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="140" y1="45" x2="140" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="150" y1="45" x2="150" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="160" y1="45" x2="160" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="170" y1="45" x2="170" y2="50" stroke="#059669" strokeWidth="2" />
                      <line x1="180" y1="45" x2="180" y2="50" stroke="#059669" strokeWidth="2" />
                      
                      {/* Label on Bottle */}
                      <rect x="90" y="100" width="100" height="140" rx="8" fill="#10b981" opacity="0.15" />
                      
                      {/* Medical Cross on Label */}
                      <rect x="130" y="145" width="20" height="50" rx="3" fill="#10b981" />
                      <rect x="120" y="155" width="40" height="20" rx="3" fill="#10b981" />
                      
                      {/* Label Lines (text simulation) */}
                      <rect x="100" y="210" width="70" height="4" rx="2" fill="#059669" opacity="0.4" />
                      <rect x="100" y="220" width="60" height="3" rx="1.5" fill="#059669" opacity="0.3" />
                      <rect x="100" y="228" width="50" height="3" rx="1.5" fill="#059669" opacity="0.3" />
                      
                      {/* Pills Around Bottle */}
                      {/* Pill 1 - Top Left */}
                      <ellipse cx="40" cy="120" rx="18" ry="10" fill="#10b981" opacity="0.8" transform="rotate(-25 40 120)" />
                      <line x1="40" y1="112" x2="40" y2="128" stroke="#059669" strokeWidth="2" />
                      
                      {/* Pill 2 - Top Right */}
                      <ellipse cx="230" cy="100" rx="18" ry="10" fill="#14b8a6" opacity="0.8" transform="rotate(35 230 100)" />
                      <line x1="230" y1="92" x2="230" y2="108" stroke="#0d9488" strokeWidth="2" />
                      
                      {/* Pill 3 - Middle Left */}
                      <ellipse cx="35" cy="200" rx="18" ry="10" fill="#06b6d4" opacity="0.8" transform="rotate(15 35 200)" />
                      <line x1="35" y1="192" x2="35" y2="208" stroke="#0891b2" strokeWidth="2" />
                      
                      {/* Pill 4 - Bottom Right */}
                      <ellipse cx="235" cy="230" rx="18" ry="10" fill="#10b981" opacity="0.8" transform="rotate(-40 235 230)" />
                      <line x1="235" y1="222" x2="235" y2="238" stroke="#059669" strokeWidth="2" />
                      
                      {/* Pill 5 - Bottom Left (Capsule style) */}
                      <g transform="rotate(45 50 270)">
                        <rect x="42" y="265" width="16" height="32" rx="8" fill="#f43f5e" opacity="0.8" />
                        <rect x="42" y="265" width="16" height="16" rx="8" fill="#dc2626" opacity="0.9" />
                      </g>
                      
                      {/* Pill 6 - Right side (Capsule style) */}
                      <g transform="rotate(-20 245 180)">
                        <rect x="237" y="175" width="16" height="32" rx="8" fill="#fbbf24" opacity="0.8" />
                        <rect x="237" y="175" width="16" height="16" rx="8" fill="#f59e0b" opacity="0.9" />
                      </g>
                      
                      {/* Highlight/Shine Effect on Bottle */}
                      <rect x="85" y="90" width="15" height="150" rx="7" fill="white" opacity="0.3" />
                      <ellipse cx="140" cy="100" rx="30" ry="15" fill="white" opacity="0.2" />
                    </svg>
                    
                    {/* Floating Animation for Pill Bottle Only */}
                    <style jsx>{`
                      @keyframes pillBottleFloat {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                      }
                      .pill-bottle-svg {
                        animation: pillBottleFloat 3s ease-in-out infinite;
                      }
                    `}</style>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Access Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Quick Access
            </h2>
            <p className="text-lg text-gray-600">
              Navigate to your most important features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="flex"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                className="w-full"
              >
                <div
                  onClick={() => navigate('/dashboard')}
                  className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <LayoutDashboard className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Dashboard
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      View analytics and reports
                    </p>

                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                      <span>Open</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </Tilt>
            </motion.div>

            {/* Pharmacies Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="flex"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                className="w-full"
              >
                <div
                  onClick={() => navigate('/pharmacies')}
                  className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-200 overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Store className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      Pharmacy Locations
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Manage pharmacy branches
                    </p>

                    <div className="flex items-center text-green-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                      <span>Open</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </Tilt>
            </motion.div>

            {/* Medicines Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="flex"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                className="w-full"
              >
                <div
                  onClick={() => navigate('/medicines')}
                  className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-emerald-200 overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Package className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      Manage Medicines
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Track pharmaceutical inventory
                    </p>

                    <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                      <span>Open</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </Tilt>
            </motion.div>

            {/* Users Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="flex"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                className="w-full"
              >
                <div
                  onClick={() => navigate('/users')}
                  className="group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-teal-200 overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Users className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      User Management
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Control access and permissions
                    </p>

                    <div className="flex items-center text-teal-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                      <span>Open</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
        }
        
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: white !important;
          width: 28px !important;
          border-radius: 5px !important;
        }
      `}</style>
    </div>
  );
};

export default Overview;
