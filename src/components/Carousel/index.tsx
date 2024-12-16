import React, { useEffect, useState } from 'react';

import { dashboardSlides } from '@/constants';

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dashboardSlides.length - 1 : prev - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === dashboardSlides.length - 1 ? 0 : prev + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full h-[65vh] md:h-[111vh] lg:h-[110vh] overflow-hidden'>
      <div className='absolute top-0 left-0 h-full w-[45%] bg-gradient-to-r from-black to-transparent opacity-80 z-10'></div>
      <div className='absolute top-0 right-0 h-full w-[45%] bg-gradient-to-l from-black to-transparent opacity-80 z-10'></div>

      {dashboardSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${
            index === currentIndex
              ? 'translate-x-0'
              : index < currentIndex
                ? '-translate-x-full'
                : 'translate-x-full'
          }`}
        >
          <img
            src={slide.image}
            className='w-full h-full hidden lg:block'
            alt={`Slide ${index + 1}`}
          />
          <img
            src={slide.mobileImage}
            className='w-full h-full block lg:hidden'
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}

      <button
        className='absolute top-1/3 md:text-4xl cursor-pointer  md:left-5 z-30 transform -translate-y-1/2 text-white p-3 text-2xl font-light rounded-full'
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className='absolute top-1/3 md:text-4xl right-0 md:right-5 z-30 transform -translate-y-1/2 text-white p-3 text-2xl font-light rounded-full'
        onClick={nextSlide}
      >
        ❯
      </button>
      <div className='absolute top-[67%] md:top-[74%] w-full flex justify-end pr-10 z-30'>
        {dashboardSlides.map((_, index) => (
          <button
            key={`dot-${index}`}
            className={`w-1.5 md:w-2 h-1.5 md:h-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
