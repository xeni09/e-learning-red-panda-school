import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import CheckoutEmpty from '../components/CheckoutEmpty';
import CheckoutSummary from '../components/CheckoutSummary';


const Checkout = () => {
  const location = useLocation();
  const { course } = location.state || {};
  const [cart, setCart] = useState(course ? [course] : []);

  const addCourse = (newCourse) => {
    setCart([...cart, newCourse]);
  };

  const removeCourse = (courseToRemove) => {
    setCart(cart.filter(course => course.id !== courseToRemove.id));
  };

  if (cart.length === 0) {
    return <CheckoutEmpty />;
  }

  return (
    <div className="container mx-auto p-4 py-20">
      <h1 className="font-bold text-[var(--color-black)] text-center pb-16">Checkout</h1>
      <div className="flex flex-col md:flex-row p-6 ">
        {/* Left Column: Steps */}
        <div className="md:w-2/3 p-4">
          <CheckoutSteps cart={cart} setCart={setCart} />
        </div>

        {/* Right Column: Course Information */}
        <CheckoutSummary cart={cart} removeCourse={removeCourse} /> 
      </div>
    </div>
  );
};

export default Checkout;