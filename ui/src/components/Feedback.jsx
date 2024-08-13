import React, { useState, useEffect, useRef } from 'react';
import alpaca from '../assets/images/alpaca.webp';
import cat from '../assets/images/cat.jpeg';
import python from '../assets/images/python.jpg';
import StarRating from '../components/StarRating';

const feedbacks = [
  {
    quote: "“A wonderful learning experience. Highly recommend to everyone.”",
    name: "Python Pete",
    title: "Newbie",
    image: python,
    rating: 5
  },
  {
    quote: "“The best course I've ever taken. The instructors are top-notch!”",
    name: "John Doe",
    title: "Web Developer",
    image: cat,
    rating: 4
  },
  {
    quote: "“A fantastic learning experience. Highly recommend to everyone.”",
    name: "Jane Smith",
    title: "Graphic Designer",
    image: alpaca,
    rating: 4
  },
  {
    quote: "“Incredible content and very engaging instructors. Five stars!”",
    name: "Alice Johnson",
    title: "Data Scientist",
    image: cat,
    rating: 5
  }
];

export default function Feedback() {
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const feedbacksWithClones = [
    feedbacks[feedbacks.length - 1],
    ...feedbacks,
    feedbacks[0]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        goToNextFeedback();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const goToNextFeedback = () => {
    setIsTransitioning(true);
    setCurrentFeedback((prevFeedback) => prevFeedback + 1);
  };

  const goToPrevFeedback = () => {
    setIsTransitioning(true);
    setCurrentFeedback((prevFeedback) => prevFeedback - 1);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setCurrentTranslate(diff);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (currentTranslate > 50) {
      goToPrevFeedback();
    } else if (currentTranslate < -50) {
      goToNextFeedback();
    }
    setCurrentTranslate(0);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentFeedback === 0) {
      setCurrentFeedback(feedbacks.length);
    } else if (currentFeedback === feedbacks.length + 1) {
      setCurrentFeedback(1);
    }
  };

  const handleDotClick = (index) => {
    setCurrentFeedback(index + 1);
  };

  return (
    <section
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8"
      style={{ backgroundColor: '#C1510E' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={containerRef}
    >
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="overflow-hidden relative">
          <div
            className={`flex transition-transform duration-1000 ${isTransitioning ? '' : 'transition-none'}`}
            style={{ transform: `translateX(calc(-${currentFeedback * 100}% + ${currentTranslate}px))` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {feedbacksWithClones.map((feedback, index) => (
              <figure key={index} className="flex-shrink-0 w-full px-4">
                <blockquote className="  text-[var(--color-white)] sm:text-2xl sm:leading-9">
                <StarRating rating={feedback.rating} />
                <h4 className="break-words text-center">{feedback.quote}</h4>
                </blockquote>
                <figcaption className="mt-10 text-center">
                  <img
                    alt=""
                    src={feedback.image}
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                  />
                  <div className="mt-4 text-[var(--color-white)]">
                    <div className="text-lg font-semibold">{feedback.name}</div>
                    <div className="text-sm">{feedback.title}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${index === (currentFeedback - 1) % feedbacks.length ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}