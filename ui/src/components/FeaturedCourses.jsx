import React from 'react';
import { Link } from 'react-router-dom';
import CourseCardGrid from './CourseCard';
import alpaca from '../assets/images/alpaca.webp';
import cat from '../assets/images/cat.jpeg';
import python from '../assets/images/python.jpg';

const courses = [
  
  {
    id: 2,
    category: 'Design',
    teacher: 'Catnip Whiskers',
    name: 'Cat Creations',
    description: 'Unleash your creativity with design principles taught by a curious cat.',
    imageSrc: cat,
    imageAlt: 'A cat representing the Design course',
    participants: 90,
    positiveReviews: 93,
    price: '49.99',
  },

  {
    id: 1,
    category: 'Programming',
    teacher: 'Alpaca McFluff',
    name: 'Alpaca Algorithms',
    description: 'Learn the fundamentals of algorithms with the fluffiest coder around.',
    imageSrc: alpaca,
    imageAlt: 'An alpaca representing the Programming course',
    participants: 150,
    positiveReviews: 98,
    price: '59.99',
  },

  {
    id: 5,
    category: 'Programming',
    teacher: 'Python Pete',
    name: 'Python Programming',
    description: 'Dive into Python programming with the expertise of Python Pete.',
    imageSrc: python,
    imageAlt: 'A python representing the Programming course',
    participants: 130,
    positiveReviews: 94,
    price: '59.99',
  },
];

const FeaturedCourses = ({ title, buttonText, buttonLink, subText, selectedCourseIds, titleFontSize = 'font-6xl' }) => {
  const filteredCourses = courses.filter(course => selectedCourseIds.includes(course.id));

  return (
    <div className="container mx-auto p-4 py-20">
      <p className={`font-bold text-[var(--color-black)] text-center pb-10 ${titleFontSize}`}>{title}</p>
      <CourseCardGrid courses={filteredCourses} />
      
      <h2 className="font-bold text-center pt-16">{subText}</h2>

      {buttonText && buttonLink && (
        <div className="text-center m-4">
          <Link to={buttonLink} className="btn">
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedCourses;