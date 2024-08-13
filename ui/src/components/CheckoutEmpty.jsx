import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-transparente.png'; // Asegúrate de ajustar la ruta según sea necesario

const CheckoutEmpty = () => {
  return (
    <div className="container mx-auto p-4 py-20 text-center">
      <img
        alt="Red Panda School"
        src={logo}
        className="mx-auto h-28 w-auto"
      />
      <h2 className="font-bold text-2xl my-10 text-[var(--color-black)]">You have no courses in the cart</h2>
      <p className="text-lg font-medium text-center mb-4 text-[var(--color-grey)]">It looks like you haven't selected any courses to purchase yet!</p>
      <Link to="/courses">
        <button className="btn-wide">
          Find your Course here!
        </button>
      </Link>
    </div>
  );
};

export default CheckoutEmpty;