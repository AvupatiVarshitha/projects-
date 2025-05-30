import React, { useState } from 'react';
import './med-style.css';


const questions = [
  {
    text: "How often do you feel overwhelmed by your thoughts or emotions?",
    options: ["Rarely", "Sometimes", "Often", "Almost Always"],
  },
  {
    text: "How well do you sleep at night?",
    options: ["Very well", "Moderately", "Poorly", "Very poorly"],
  },
  {
    text: "Do you experience physical symptoms like headaches, fatigue, or body aches?",
    options: ["Never", "Occasionally", "Frequently", "Always"],
  },
  {
    text: "How motivated do you feel to start your day?",
    options: ["Energized", "Routine", "Tired", "Dreading"],
  },
  {
    text: "How often do you feel disconnected from people/situations?",
    options: ["Rarely", "Sometimes", "Often", "Almost Always"],
  },
  {
    text: "How do you handle stress?",
    options: ["Well", "Coping", "Struggle", "Losing Control"],
  },
  {
    text: "Lost interest in activities once enjoyed?",
    options: ["Never", "Occasionally", "Frequently", "Completely"],
  },
];

const getResultMessage = (score) => {
  if (score <= 5) return "Balanced Mind – Good coping. Try beginner mindfulness.";
  if (score <= 12) return "Mild Distress – Group meditation & lifestyle support suggested.";
  if (score <= 18) return "Moderate Stress – Guided healing & group meditation advised.";
  return "High Overload – Personalized care & frequent check-ins needed.";
};

const Meditation = () => {

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // To disable button while saving
  const [email, setEmail] = useState('');

  const handleChange = (qIndex, value) => {
  if (submitted) return; // prevent changes after submit
  const newAnswers = [...answers];
  newAnswers[qIndex] = parseInt(value);
  setAnswers(newAnswers);
};


 const handleSubmit = () => {
  if (answers.includes(null)) {
    alert("Please answer all questions.");
    return;
  }

  if (!email.trim()) {
    alert("Please enter your email before submitting.");
    return;
  }

  // continue submission
  setLoading(true);
  const score = answers.reduce((sum, val) => sum + (val || 0), 0);

  fetch('http://localhost:5000/api/save-assessment', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, answers, score }),
  })
  .then(res => res.json())
  .then(data => {
    setLoading(false);
    if (data.success) {
      setSubmitted(true);
    } else if (data.message === 'Assessment already taken') {
      alert('You have already taken this assessment.');
      setSubmitted(true);
    } else {
      alert('Error saving assessment. Showing result anyway.');
      setSubmitted(true);
    }
  })
  .catch(() => {
    setLoading(false);
    
    setSubmitted(true);
  });
};


  const score = answers.reduce((sum, val) => sum + (val || 0), 0);
  const resultMessage = getResultMessage(score);

  return (
    <div>
      <header>
        <h1>Heal. Balance. Thrive.</h1>
        <p>Reconnect with your inner peace through guided meditations, self-checks, and emotional healing journeys.</p>
      </header>

      <main>
        <section>
          <h2>Start Here: Mental Health Self-Assessment</h2>
          <p><strong>Instructions:</strong> Choose the option that best describes your current experience. Be honest—this is for your personal reflection and better guidance.</p>
          <form>
            {questions.map((q, index) => (
              <div key={index} className="question">
                <p>{index + 1}. {q.text}</p>
                {q.options.map((option, i) => (
                  <label key={i}>
                    <input
  type="radio"
  name={`q${index}`}
  value={i}
  checked={answers[index] === i}
  onChange={() => handleChange(index, i)}
  disabled={submitted}
/>

                    {String.fromCharCode(65 + i)}. {option}
                  </label>
                ))}
              </div>
            ))}
            <button
  type="button"
  className="subscribe"
  onClick={handleSubmit}
  
  disabled={submitted || loading}
>
  {loading ? 'Submitting...' : (submitted ? 'Assessment Submitted' : 'Submit Assessment')}
</button>

          </form>
          <div className="email-input" style={{ marginBottom: '20px' }}>
  <label>
    Enter your email to begin:
    
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      required
    />
    
  </label>
</div>

          {submitted && (
            <div className="box" style={{ marginTop: '20px' }}>
              <strong>Your Score: {score}</strong><br />
              {resultMessage}
            </div>
          )}
        </section>

        <section>
          <h2>Post-Assessment Options</h2>
          <button className="subscribe">Solo Meditation</button>
          <button className="subscribe">Group Healing</button>
          <button className="subscribe">Talk to a Mentor</button>
        </section>

        <section>
          <h2>Meditation Programs Offered</h2>
          <ul>
            <li><strong>Mind Reset (Solo):</strong> App + Email | 7 Days | For mild stress</li>
            <li><strong>Harmony Circles (Group):</strong> Live Zoom | Weekly | Group healing</li>
            <li><strong>Inner Child Healing Series:</strong> Guided Audio | 14 Days | Deep healing</li>
          </ul>
        </section>

        <section>
          <h2>Subscription Plans</h2>
          <ul>
            <li><strong>Solo Serenity:</strong> Daily audios + tracker – ₹449/month</li>
            <li><strong>Group Heal Plan:</strong> Solo + Weekly live – ₹799/month</li>
          </ul>
          <button className="subscribe">Subscribe Now</button>
          <p><em>Cancel anytime. First week free.</em></p>
        </section>

        <section>
          <h2>Why Choose Us</h2>
          <ul>
            <li>Non-judgmental, safe digital space</li>
            <li>Female-led guidance and trauma-sensitive methods</li>
            <li>Meditation meets mental health science</li>
          </ul>
        </section>
      </main>

      <div className="footer-cta">
        <p>Not sure where to begin? Mail us at: <strong>xxxxxxxxxxxx.com</strong></p>
      </div>

      <footer>
        &copy; 2025 Phoenix Femmes. All rights reserved.
      </footer>
    </div>
  );
};

export default Meditation;
