import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSummary = ({ cart, removeCourse }) => {
  return (
    <div className="md:w-1/3 p-8 bg-white rounded-lg shadow-md">
      <p className="font-bold text-3xl my-4">Your Courses</p>
      <div>
        <ul>
          {cart.map((course) => (
            <li key={course.id} className="flex items-center mb-4">
              <img src={course.posterUrl} alt={course.name} className="w-16 h-16 rounded-lg shadow-md mr-4" />
              <div className="flex-1">
                <h4 className="font-bold text-xl">{course.name}</h4>
                <p>by {course.teacherName}</p>
                <p className="text-lg">{course.price}</p>
              </div>
              <button
                onClick={() => removeCourse(course)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t pt-4">
          <p className="text-lg font-bold">Subtotal: {cart.reduce((total, course) => total + parseFloat(course.price.replace('€', '')), 0)}€</p>
          <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to="/courses" className="font-medium">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;