import React, { useRef } from 'react';
import './soft-skills-style.css'; // Assuming you’ll style this separately
import axios from 'axios';

const SoftSkills = () => {
   const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      mobile: form.mobile.value,
      college: form.college.value,
      ageGroup: form.age.value,
      workshops: Array.from(form['workshops[]']).filter(w => w.checked).map(w => w.value),
      mode: form.mode.value,
      updates: form.updates.value,
    };

    try {
      const response = await axios.post('https://valkyrriemeds-backend-1.onrender.com/api/softskills/enroll-softskills', data);
      alert(response.data.message);
      form.reset();
    } catch (error) {
      if (error.response && error.response.data.message) {
    alert(error.response.data.message); // shows custom error from backend
  } else {
    alert('Submission failed. Try again.');
    }
  }
  };
  
  return (
    <div className="soft-skills-container">
      <section className="hero">
        <h1>Speak Boldly. Lead Confidently.</h1>
        <p>
          Master the skills that define 21st-century success: communication, leadership, and emotional intelligence.
        </p>
      </section>

      <section>
        <h2>What You’ll Learn</h2>
        <ul>
          <li>Public Speaking & Presentation</li>
          <li>Team Collaboration & Conflict Handling</li>
          <li>Active Listening & Feedback Skills</li>
          <li>Time Management & Personal Branding</li>
          <li>Interview & Workplace Communication</li>
        </ul>
      </section>

      <section>
        <h2>Workshop Calendar</h2>
        <button>See All Upcoming Workshops</button>
      </section>

      <section>
        <h2>Who Can Join</h2>
        <ul>
          <li>College students looking to stand out</li>
          <li>Entrepreneurs needing persuasive communication</li>
          <li>Anyone eager to boost confidence & leadership presence</li>
        </ul>
        <button onClick={scrollToForm}>Enroll Now</button>
      </section>

      <section>
        <h2>Certifications</h2>
        <p>Certificate of Participation (for each workshop)</p>
      </section>

      <section>
        <h2>Want to bring our training to your campus or company?</h2>
        <p>Email: valkyrriemeds@gmail.com</p>
      </section>

      <section ref={formRef}>
        <h2>Enrollment Form</h2>
        <form onSubmit={handleSubmit}>

          <label>
            Full Name: <input type="text" name="name" required />
          </label>
          <label>
            Email ID: <input type="email" name="email" required />
          </label>
          <label>
            Mobile Number: <input type="tel" name="mobile" required />
          </label>
          <label>
            College/Organization: <input type="text" name="college" />
          </label>

          <p>Age Group:</p>
          <label><input type="radio" name="age" value="below18" /> Below 18</label>
          <label><input type="radio" name="age" value="18-25" /> 18–25</label>
          <label><input type="radio" name="age" value="26-35" /> 26–35</label>
          <label><input type="radio" name="age" value="36plus" /> 36+</label>

          <p>Select Workshop(s) You’re Interested In:</p>
          <label><input type="checkbox" name="workshops[]" value="public_speaking" /> Speak to Lead</label>
          <label><input type="checkbox" name="workshops[]" value="leadership" /> Leadership for College Captains</label>
          <label><input type="checkbox" name="workshops[]" value="branding" /> Personal Branding</label>
          <label><input type="checkbox" name="workshops[]" value="interview" /> Interview Mastery</label>
          <label><input type="checkbox" name="workshops[]" value="emotional_intelligence" /> Emotional Intelligence</label>

          <p>Preferred Mode of Learning:</p>
          <label><input type="radio" name="mode" value="online" /> Online</label>
          <label><input type="radio" name="mode" value="in-person" /> In-Person</label>

          <p>Would you like to receive updates about future workshops?</p>
          <label><input type="radio" name="updates" value="yes" /> Yes</label>
          <label><input type="radio" name="updates" value="no" /> No</label>

          <button type="submit">Submit Enrollment</button>
        </form>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ol>
          <li>Confirmation & Payment (if applicable)</li>
          <li>Email with Zoom link, calendar reminder</li>
          <li>24hr reminder before the session</li>
        </ol>
        <p>For questions: valkyrriemeds@gmail.com </p>
        <button onClick={scrollToForm}>Enroll Now – Limited Seats Available</button>
      </section>

      <footer>
        <p>© 2025 Phoenix Femmes</p>
        <nav>
          <a href="about.html">About Us</a> | <a href="contact.html">Contact</a> | <a href="join.html">Join</a>
        </nav>
        
      </footer>
    </div>
  );
};

export default SoftSkills;