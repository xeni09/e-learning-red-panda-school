import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo-transparente.png'; // Adjust the path as necessary

const Confirmation = () => {
  const location = useLocation();
  const { cart = [], formData = {} } = location.state || {};

  return (
    <div className="container mx-auto p-4 py-20 text-center">
      <img
        alt="Red Panda School"
        src={logo}
        className="mx-auto h-28 w-auto mb-10"
      />
      <h1 className="font-bold text-3xl my-4 text-[var(--color-black)]">Congratulations!</h1>
      <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">You have successfully bought the course.</p>
      {formData.email ? (
        <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-6">An email confirmation has been sent to {formData.email}.</p>
      ) : (
        <p className=" text-center text-lg font-medium text-[var(--color-grey)] mb-6">Email confirmation could not be sent.</p>
      )}
      <p className="text-center text-lg font-medium text-[var(--color-grey)] mb-10">You can access the course via the link sent in your email.</p>
      <h2 className="font-bold text-2xl my-4 text-[var(--color-black)]">Order Summary</h2>
      <ul className="mb-10">
        {cart.length > 0 ? (
          cart.map((course, index) => (
            <li key={index} className="mb-4 text-center">
              <h3 className="font-bold text-xl text-[var(--color-black)]">{course.name}</h3>
              <p className="text-center text-lg font-medium text-[var(--color-grey)]">by {course.teacherName}</p>
              <p className="text-center text-lg font-medium text-[var(--color-grey)]">Price: {course.price}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-lg font-medium text-[var(--color-grey)]">No courses in the cart.</p>
        )}
      </ul>
      <Link to="/courses">
        <button className="btn-wide">
          Back to Courses
        </button>
      </Link>
    </div>
  );
};

export default Confirmation;