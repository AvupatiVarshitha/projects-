import React from 'react';
import './JoinUs.css';

function JoinUs() {
  return (
    <section className="join-us-container">
      <h1>Join Us</h1>
      <p className="subtitle">Be Part of a Movement That Empowers Minds & Heals Souls</p>

      <p className="intro">
        At <strong>Phoenix Femmes</strong>, we're building a community where ideas grow, voices rise, and hearts heal.
        Whether you're a student, educator, entrepreneur, or wellness seeker — there's a place here for you.
      </p>

      <div className="join-options">
        <div className="card">
          <h2>Students & Young Aspirants</h2>
          <p>Join our workshops, access startup toolkits, and grow your confidence through skill-building programs.</p>
          <button>Enroll as a Learner</button>
        </div>
        <div className="card">
          <h2>Educators & Institutions</h2>
          <p>Bring Phoenix Femmes training programs to your college or organization. Let your students grow beyond textbooks.</p>
          <button>Partner With Us</button>
        </div>
        <div className="card">
          <h2>Mentors, Coaches & Collaborators</h2>
          <p>Are you a startup mentor, soft skills coach, or mental wellness guide? Join our expert panel to impact more lives.</p>
          <button>Join as a Mentor</button>
        </div>
      </div>

      <div className="benefits">
        <h3>Benefits of Joining</h3>
        <ul>
          <li>✅ Access to exclusive toolkits and guided resources</li>
          <li>✅ Certificates for completed programs</li>
          <li>✅ Invitations to Phoenix Circles (community events & mentorship calls)</li>
          <li>✅ Discounted passes to leadership and healing retreats</li>
          <li>✅ A network of purpose-driven peers and changemakers</li>
        </ul>
      </div>

      <div className="contact">
        <h4>Need Help Deciding?</h4>
        <p>Email: <a href="mailto:join@phoenixfemmes.com">join@phoenixfemmes.com</a></p>
        <p>Phone/WhatsApp: <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a></p>
      </div>
    </section>
  );
}

export default JoinUs;
