import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import leftImage from './images/left.jpg';
import centerImage from './images/middle.jpg';
import rightImage from './images/right.jpg';
import { Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Empower the Mind. Elevate the Self. Embark on the Journey.</h1>
        <p>
          Unlock your potential with transformative training in entrepreneurship,
          communication, and emotional well-being.
        </p>
        <div className="cta">
          <button onClick={() => handleNavigation('/entrepreneurship')}>
            Start Your Entrepreneurial Journey
          </button>
          <button onClick={() => handleNavigation('/soft-skills')}>
            View Upcoming Soft Skills Workshops
          </button>
          <button onClick={() => handleNavigation('/meditation')}>
            Take the Mental Health Check
          </button>
        </div>
      </section>

      {/* Split Images */}
      <section className="split-images">
        <div className="image left" style={{ backgroundImage: `url(${leftImage})` }}></div>
        <div className="image center" style={{ backgroundImage: `url(${centerImage})` }}></div>
        <div className="image right" style={{ backgroundImage: `url(${rightImage})` }}></div>
      </section>

      {/* Offerings Section */}
      <section className="offerings">
        <h2>What We Offer</h2>
        <div className="cards">
          <div className="card" onClick={() => handleNavigation('/entrepreneurship')}>
            <h3>Entrepreneurship & Startup Development</h3>
            <ul>
              <li>Turn your ideas into impactful ventures.</li>
              <li>Free access to startup templates for verified students</li>
              <li>Resources, mentorship, and guided frameworks</li>
            </ul>
          </div>
          <div className="card" onClick={() => handleNavigation('/soft-skills')}>
            <h3>Soft Skills for Life & Leadership</h3>
            <ul>
              <li>Speak with clarity. Lead with confidence.</li>
              <li>Upcoming workshops on communication, leadership, teamwork</li>
              <li>Certification for participants</li>
            </ul>
          </div>
          <div className="card" onClick={() => handleNavigation('/meditation')}>
            <h3>Healing through Meditation</h3>
            <ul>
              <li>Your mental peace is your superpower.</li>
              <li>Personalized meditation journeys</li>
              <li>Group & solo training subscriptions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="why">
        <h2>Why Valkyrrie Meds?</h2>
        <div className="reasons">
          <div>Holistic personal & professional growth</div>
          <div>Trusted by colleges, students, and mental health experts</div>
          <div>Affordable & accessible programs</div>
        </div>
      </section>

      {/* Footer */}
      <footer>
  <nav className="footer-nav">
    <Link to="/about">About Us</Link> |{" "}
    <Link to="/contact">Contact</Link> |{" "}
    <Link to="/join">Join</Link> |{" "}
    <Link to="/feedback">Feedback</Link>
  </nav>
  <div className="social">
    {/* Add social icons or links here */}
  </div>
  <form className="newsletter" onSubmit={handleSubscribe}>
    Stay inspired. Get updates on new workshops and resources.
  </form>
</footer>
    </div>
  );
}

export default Home;
