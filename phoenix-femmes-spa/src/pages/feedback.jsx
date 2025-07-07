import React, { useState } from 'react';
import './feedback.css';

function Feedback() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    date: '',
    trainingRating: '',
    enjoyment: '',
    keyLearnings: '',
    confusion: '',
    valuableLearning: '',
    trainerRating: '',
    overallRating: '',
    additionalComments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log('Submitting formData:', formData); // Debugging line

  try {
    const response = await fetch('https://valkyrriemeds-backend-1.onrender.com/api/feedback/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
  }
};



  const renderRating = (name) => (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((num) => (
        <label key={num}>
          <input
            type="radio"
            name={name}
            value={num}
            checked={formData[name] === String(num)}
            onChange={handleChange}
          />
          <span>{num}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="feedback-container">
      <h1>Training Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <label>Please rate training content</label>
        {renderRating('trainingRating')}

        <textarea
          name="enjoyment"
          placeholder="What did you enjoy most about the training?"
          value={formData.enjoyment}
          onChange={handleChange}
        />

        <textarea
          name="keyLearnings"
          placeholder="Please list 2–3 key learnings and how you'll apply them."
          value={formData.keyLearnings}
          onChange={handleChange}
        />

        <textarea
          name="confusion"
          placeholder="Any subject matter that you found confusing?"
          value={formData.confusion}
          onChange={handleChange}
        />

        <textarea
          name="valuableLearning"
          placeholder="What is the most valuable thing you learned today?"
          value={formData.valuableLearning}
          onChange={handleChange}
        />

        <label>Please rate your trainer</label>
        {renderRating('trainerRating')}

        <label>Please rate the overall training</label>
        {renderRating('overallRating')}

        <textarea
          name="additionalComments"
          placeholder="Any additional comments you wish to share?"
          value={formData.additionalComments}
          onChange={handleChange}
        />

        <h2>Thank You!</h2>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;
