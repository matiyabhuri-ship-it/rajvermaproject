import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  // Wedding themed placeholder images
  const slides = [
    {
      id: 1,
      url: 'https://media.istockphoto.com/id/1491447434/photo/bengali-wedding-ritual-closeup-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=xuKZgr9DJ6jYxheEpUyFbtzM9NiXbsK8Y7v23RxKGWU=',
      title: 'Shivani & Rohan',
      subtitle: 'We Are Getting Married'
    },
    {
      id: 2,
      url: 'https://media.istockphoto.com/id/2200874395/photo/loving-groom-and-bride-in-wedding-ceremony.webp?a=1&b=1&s=612x612&w=0&k=20&c=aqG5x39iUZpKlQcKEsGL71fsteM6EO2_r_cQY4LjPlg=',
      title: 'Join Our Celebration',
      subtitle: '24th November 2026 • New Delhi'
    },
    {
      id: 3,
      url: 'https://media.istockphoto.com/id/1141906552/photo/indian-hindu-couple-holding-each-other-hands-during-their-marriage-symbolising-love-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=LNV6z233jSuUeU9m2M2NcsfWAwfetNWyuSksx-k-rHM=',
      title: 'Forever Begins',
      subtitle: 'Share the joy with us'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden mt-20 md:mt-24">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          {/* Elegant Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          <img
            src={slide.url}
            alt="wedding couple"
            className={`w-full h-full object-cover object-center transform transition-transform duration-[10000ms] ${index === currentIndex ? 'scale-105' : 'scale-100'
              }`}
          />

          {/* Text Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-md mb-4 md:mb-6 leading-tight">
              {slide.title}
            </h1>
            <p className="text-white text-sm md:text-lg lg:text-xl tracking-[0.3em] md:tracking-[0.5em] uppercase font-light drop-shadow-md">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors"
      >
        <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/75'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
