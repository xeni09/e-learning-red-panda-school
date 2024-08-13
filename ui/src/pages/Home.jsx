import React from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import heroBanner from "../assets/hero-banner2.png";
import Feedback from '../components/Feedback';
import CallToAction from "../components/CallToAction";
import FeaturedCourses from '../components/FeaturedCourses';

const Home = () => {
  const selectedCourseIds = [1, 2, 5];
  return (
    <>
      <Section
        backgroundColor="orange"
        titleColor="white"
        textColor="white"
        image={heroBanner}
        title="The Best Online Platform for Education."
        text={<>
          Online courses from the world's leading experts.
          <br />
          Join 17 million learners today.
        </>}
        imagePosition="right"
        imageSize={500}
        buttonBgColor={"yellow"}
        buttonTextColor={"white"}
        buttonText={"Let's Get Started"}
        buttonLink="/courses"
        showStatsSection={true}
      />
      <FeaturedCourses 
        title="Featured Courses" 
        subText="Ready to learn with us?"
        selectedCourseIds={selectedCourseIds} 
        buttonText="Explore all courses" 
        buttonLink="/courses" 
      />
      
      <Feedback />
      <CallToAction />
    </>
  );
};

export default Home;