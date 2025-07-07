import React from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
   const navigate = useNavigate(); // 👈 Hook for navigation

  const handleBookCall = () => {
    navigate('/contact'); // 👈 Navigate to Contact page
  };
  return (
    <section className="about-container">
      <div className="about-top">
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            Valkyrrie Meds Pvt.Ltd. ia a transformative platform dedicated to empowering individuals through a unique fusion of 
            entrepreneurship training, softskills development, and mental wellness practices.
          </p>
          <p><strong>Empowering Minds, Elevating Lives : Valkyrrie Meds ignites transformation through entrepreneurship, soft skills, and wellness!!</strong></p>
          <button className="call-button" onClick={handleBookCall}>Book a Call</button>

        </div>
      </div>

      <div className="about-features">
        <div className="feature">
          <h3><span>01</span> Entrepreneurship </h3>
          <p>Unlock Your Potential: Entrepreneurship training to turn your vision into reality.</p>
        </div>
        <div className="feature">
          <h3><span>02</span> Soft Skills </h3>
          <p>Elevate Your Edge: Soft Skills development to excel in a competitive world.</p>
        </div>
        <div className="feature">
          <h3><span>03</span> Wellness </h3>
          <p>Nurture Your Mind: Wellness practices to cultivate inner strength and resilience.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
