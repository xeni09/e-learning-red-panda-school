import React, { useState } from "react";
import "./Footer.css";
import logo from "../assets/logo.svg";
import youtube from "../assets/socials-youtube.png";
import instagram from "../assets/socials-instagram.png";
import facebook from "../assets/socials-facebook.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { email });
    setEmail("");
  };

  return (
    <footer className="footer pt-16 bg-primary text-light mt-auto">
      <div className="footer-content pb-10">
        {/* Brand and socials section */}
        <div className="footer-section">
          <div className="brand-container">
            <img src={logo} alt="logo" className="footer-logo" />
            <div className="footer-brand">
              Red
              <br />
              Panda
              <br />
              School
            </div>
          </div>
          <p className="footer-text py-4 text-left">We are your new high-quality school.</p>
          <div className="footer-socials">
            <a href="not-created">
              <img className="footer-socials-img" src={youtube} alt="" />
            </a>
            <a href="not-created">
              <img className="footer-socials-img" src={instagram} alt="" />
            </a>
            <a href="not-created">
              <img className="footer-socials-img" src={facebook} alt="" />
            </a>
          </div>
        </div>

        {/* Popular courses section */}
        <div className="footer-section">
          <h3>Popular courses</h3>
          <ul>
            <li>
              <a href="not-created">Advanced design</a>
            </li>
            <li>
              <a href="not-created">Web development</a>
            </li>
            <li>
              <a href="not-created">Data visualization</a>
            </li>
          </ul>
        </div>

        {/* Support section */}
        <div className="footer-section">
          <h3>Need support?</h3>
          <p>Contact us at </p>
          <a href="mailto:support@redpandaschool.com">support@redpandaschool.com</a>
        </div>

        {/* Newsletter subscription section */}
        <div className="footer-section">
          <h3>Subscribe our newsletter</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              className="block w-full  rounded-md border-0 py-1.5 mb-2 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
            />
            <button className="btn-fullwidth" type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Legal section */}
      <div className="legal py-8">
        <ul>
          <li><a href="terms-of-service">Terms of Service</a></li>
          <li><a href="privacy-policy">Privacy Policy</a></li>
        </ul>
        <p>&copy; 2024 RedPandaSchool. Inesdi</p>
      </div>
    </footer>
  );
};

export default Footer;