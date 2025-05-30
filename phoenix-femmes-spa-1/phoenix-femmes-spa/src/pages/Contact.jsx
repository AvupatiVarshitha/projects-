import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import { useState } from 'react';


function Contact() {
  const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  mobileNumber: '',
  subject: '',
  message: '',
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:5000/api/submit-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Message submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        subject: '',
        message: '',
      });
    } else {
      // Show the exact error returned by the backend
      alert(data.error || 'Something went wrong.');
    }
  } catch (err) {
    console.error(err);
    alert('Server error. Please try again later.');
  }
};


  return (
    <section className="contact-page">
      <h1>We’d Love to Hear From You!</h1>
      <p className="intro">
        Whether you have a question, want to collaborate, or simply share your experience,
        we’re here to listen and respond.
      </p>

      <div className="contact-content">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> <a href="mailto:support@phoenixfemmes.com">support@phoenixfemmes.com</a></p>
          <p><strong>Phone/WhatsApp:</strong> <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a></p>
          <p><strong>Instagram:</strong> @phoenixfemmes</p>
          <p><strong>Office Address:</strong><br />
            Phoenix Femmes,<br />
            [Your Location / Co-working Space Address],<br />
            India
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
  <h3>Send Us a Message</h3>

  <label>
    Full Name:
    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Email ID:
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Mobile Number (Optional):
    <input
      type="tel"
      name="mobileNumber"
      value={formData.mobileNumber}
      onChange={handleChange}
    />
  </label>

  <label>
    Subject:
    <input
      type="text"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Message:
    <textarea
      name="message"
      rows="5"
      value={formData.message}
      onChange={handleChange}
      required
    ></textarea>
  </label>

  <button type="submit">Submit</button>
  <p className="response-time">You’ll receive a response within 24–48 hours.</p>
</form>

      </div>

      <div className="feedback-section">
        <p>Want to share your experience or suggestion?</p>
        <Link to="/feedback" className="feedback-link-button">Give Feedback</Link>
      </div>
    </section>
  );
}

export default Contact;