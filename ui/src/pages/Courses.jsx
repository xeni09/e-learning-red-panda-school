import React, { useState } from 'react';
import CourseCardGrid from '../components/CourseCard';
import Section from "../components/Section";

import heroBanner from "../assets/hero-banner3.jpeg";

import alpaca from '../assets/images/alpaca.webp';
import bear from '../assets/images/bear.jpeg';
import camel from '../assets/images/camel.webp';
import cat from '../assets/images/cat.jpeg';
import panda from '../assets/images/panda.jpg';
import giraffe from '../assets/images/giraffe.jpeg';
import python from '../assets/images/python.jpg';
import lemur from '../assets/images/lemur.jpeg';
import fox from '../assets/images/fox.jpg';


const courses = [
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
    id: 3,
    category: 'Marketing',
    teacher: 'Bearington Bear',
    name: 'Bear Branding',
    description: 'Master the art of branding with the most strategic bear in the forest.',
    imageSrc: bear,
    imageAlt: 'A bear representing the Marketing course',
    participants: 120,
    positiveReviews: 95,
    price: '39.99',
  },
  {
    id: 4,
    category: 'Business',
    teacher: 'Camelot Humps',
    name: 'Camel Commerce',
    description: 'Navigate the business landscape with insights from a wise camel.',
    imageSrc: camel,
    imageAlt: 'A camel representing the Business course',
    participants: 110,
    positiveReviews: 97,
    price: '69.99',
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
  {
    id: 6,
    category: 'Art',
    teacher: 'Giraffey Longneck',
    name: 'Giraffe Gallery',
    description: 'Paint the world with creativity under the guidance of a tall and talented giraffe.',
    imageSrc: giraffe,
    imageAlt: 'A giraffe representing the Art course',
    participants: 70,
    positiveReviews: 94,
    price: '49.99',
  },
  {
    id: 7,
    category: 'Photography',
    teacher: 'Lemur Leap',
    name: 'Lemur Photography',
    description: 'Capture moments with precision and skill from the sharp-eyed lemur.',
    imageSrc: lemur,
    imageAlt: 'A lemur representing the Photography course',
    participants: 60,
    positiveReviews: 96,
    price: '39.99',
  },
  {
  id: 8,
  category: 'Design',
  teacher: 'Panda Picasso',
  name: 'Panda Patterns',
  description: 'Explore design patterns with the artistic Panda Picasso.',
  imageSrc: panda,
  imageAlt: 'A panda representing the Design course',
  participants: 85,
  positiveReviews: 92,
  price: '49.99',
},
{
  id: 9,
  category: 'Marketing',
  teacher: 'Foxie Fox',
  name: 'Foxie Funnels',
  description: 'Learn about marketing funnels with the clever Foxie Fox.',
  imageSrc: fox,
  imageAlt: 'A fox representing the Marketing course',
  participants: 100,
  positiveReviews: 93,
  price: '39.99',
},
];

const Courses = () => {
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredCourses = filter === 'All' ? courses : courses.filter(course => course.category === filter);

  const categories = ['All', ...new Set(courses.map(course => course.category))];

  return (
    <>
      <Section
        backgroundColor="orange"
        titleColor="white"
        textColor="white"
        image={heroBanner}
        imagePosition={"left"}
        imageSize={300}
        title="Best Courses and Tutorials"
        text={
          <>
            Find the course that fits you!
            <br />
            All courses from the world's best animals.
          </>
        }
      />
      <div className="container mx-auto p-4 py-20">
      <h1 className=" font-bold text-center pb-10">Our Courses</h1>

        <div className="flex flex-wrap justify-center space-x-4 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 mb-4 rounded transform transition-transform duration-200 hover:scale-105 ${filter === category ? 'text-[var(--color-white)]' : 'bg-gray-200 text-[var(--color-black)]'}`}
              style={filter === category ? { backgroundColor: 'var(--color-yellow)'  } : {}}
              
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <CourseCardGrid courses={filteredCourses} />
      </div>
    </>
  );
};

export default Courses;