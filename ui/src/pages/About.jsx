import React from 'react';
import Section from "../components/Section";
import heroBanner from "../assets/hero-banner2.png";
import Feedback from "../components/Feedback";
import CallToAction from "../components/CallToAction";
import '../index.css';


import alpaca from '../assets/images/alpaca.webp';
import bear from '../assets/images/bear.jpeg';
import camel from '../assets/images/camel.webp';
import cat from '../assets/images/cat.jpeg';
import cat2 from '../assets/images/cat2.webp';
import giraffe from '../assets/images/giraffe.jpeg';
import goat from '../assets/images/goat.jpeg';
import lemur from '../assets/images/lemur.jpeg';
import ostrich from '../assets/images/ostrich.webp';
import squirrel from '../assets/images/squirrel.jpeg';

const people = [
  {
    name: 'Alpaca McFluff',
    role: 'Chief Wool Officer',
    description: 'Master of all things fluffy and cozy',
    image: alpaca,
  },
  {
    name: 'Bearington Bear',
    role: 'Chief Honey Taster',
    description: 'Expert in finding the sweetest honey',
    image: bear,
  },
  {
    name: 'Catnip Whiskers',
    role: 'Chief Purr Officer',
    description: 'Purrs with the best of them',
    image: cat,
  },
  {
    name: 'Camelot Humps',
    role: 'Chief Water Officer',
    description: 'Always stays hydrated',
    image: camel,
  },
  {
    name: 'Giraffey Longneck',
    role: 'Head of Heights',
    description: 'Sees everything from above',
    image: giraffe,
  },
  {
    name: 'Goatee McBeard',
    role: 'Grass Specialist',
    description: 'Knows all about the best grazing spots',
    image: goat,
  },
  {
    name: 'Lemur Leap',
    role: 'Jumping Expert',
    description: 'Loves to leap from tree to tree',
    image: lemur,
  },
  {
    name: 'Ostrich Speedster',
    role: 'Fast Runner',
    description: 'Runs faster than the wind',
    image: ostrich,
  },
  {
    name: 'Squirrel Nutkins',
    role: 'Nut Collector',
    description: 'Has a knack for finding the best nuts',
    image: squirrel,
  },
  {
    name: 'Whiskers McPurr',
    role: 'Chief Nap Officer',
    description: 'Expert in finding the coziest napping spots',
    image: cat2,
  },
];

const About = () => {
  return (
    <>
      <Section
        backgroundColor="orange"
        titleColor="white"
        textColor="white"
        image={heroBanner}
        title={"About Us"}
        text="Welcome to Red Panda School, where learning is as fun as a barrel of monkeys! Whether you're looking to master the art of coding, become a culinary wizard, or just want to learn how to juggle flaming torches (okay, maybe not that last one), we've got you covered. Join us and let's make learning an adventure!"
        imagePosition={"left"}
        imageSize={500}
        showStatsSection={true}
      />

      <div className="container mx-auto">
        <div className='pt-10'>
          <h1 className=" font-bold text-center pb-10">Meet our Team</h1>
          <h6 className='text-center px-6'> 
            Our team is composed of dedicated professionals who are passionate about education and committed to helping our students succeed. Each member brings a wealth of experience and expertise to the table, ensuring that our students receive the best possible learning experience.
          </h6>

          <ul role="list" className="py-20 grid gap-x-8 gap-y-12 md:grid-cols-2 sm:gap-y-10 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-start gap-x-6">
                  <div className="flex-shrink-0 w-44 h-44 overflow-hidden rounded-lg" style={{ aspectRatio: '1 / 1' }}>
                    <img alt="" src={person.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="max-w-xl">
                    <h5 className="text-base font-semibold leading-7 tracking-tight">{person.name}</h5>
                    <h6 className="text-sm font-semibold leading-6 text-primary">{person.role}</h6>
                    <p className="text-sm text-left">{person.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
      <Feedback />
      <CallToAction buttonText="All Courses"
      buttonLink={"/courses"} />
    </>
  );
};

export default About;