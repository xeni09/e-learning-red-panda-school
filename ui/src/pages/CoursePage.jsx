import React from 'react';
import { useParams } from 'react-router-dom';
import CourseTabs from '../components/CourseTabs';
import CourseSummary from '../components/CourseSummary';
import FeaturedCourses from '../components/FeaturedCourses'; // Importa el componente

const CoursePage = () => {
  const { courseId } = useParams();
  // Aquí puedes obtener los datos del curso usando el courseId, por ejemplo, desde una API o un estado global.
  
  const course = {
    title: "Big Buck Bunny",
    instructor: "Rabbit Teacher",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    posterUrl: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    price: "99 €"
  };
  const selectedCourseIds = [2, 5];

  return (
    <div className="container my-16 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-3 mx-5">
          {/* Course Header */}
          <div className="order-2 md:order-1 mb-4">
            <h1 className="font-bold">{course.title}</h1>
            <p className="text-xl text-[var(--color-grey)]">{course.instructor}</p>
          </div>

          {/* Course Video */}
          <div className="order-1 md:order-2 mb-4"> 
            <video 
              className="w-full h-auto" 
              controls 
              poster={course.posterUrl}
            >
              <source src={course.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Course Tabs */}
          <div className="order-5 md:order-3 w-full">
            <CourseTabs />
          </div>
          {/* Featured Courses */}
      <FeaturedCourses 
        title="Related Courses" 
        selectedCourseIds={selectedCourseIds} 
        titleFontSize="text-4xl"
    
      />
        </div>
        
        <div className="order-4 md:order-4 col-span-1">
          {/* Course Summary */}
          <div className="sticky top-40">
            <CourseSummary 
                  courseName={course.title}
                  price={course.price} 
                  teacherName={course.instructor} 
                  posterUrl={course.posterUrl} />
          </div>
        </div>

        
      </div>

      
    </div>
  );
};

export default CoursePage;