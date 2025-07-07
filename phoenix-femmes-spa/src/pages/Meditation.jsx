import React, { useState, useContext } from 'react';

import './med-style.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);



  // ✅ Razorpay Payment Function
  
    const loadRazorpay = async (amount) => {
  try {
    const response = await fetch('https://valkyrriemeds-backend-1.onrender.com/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    const options = {
      key: "rzp_test_7RPQGQeGdneDLx", // Replace with your Razorpay Key
      amount: data.amount,
      currency: data.currency,
      name: "Phoenix Femmes Spa",
      description: "Mental Health Subscription",
      order_id: data.id,
      handler: function (response) {
        // ✅ On successful payment, navigate to the success page
        navigate('/payment-success', { state: { paymentId: response.razorpay_payment_id, amount: data.amount/100 } });
      },
      prefill: {
        name: "Varshitha",
        email: "test@example.com",
        contact: "9999999999"
      },
      notes: {
        address: "Phoenix Mental Health Center"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  // ✅ Assessment Submission
  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email before submitting.");
      return;
    }

    setLoading(true);
    const score = answers.reduce((sum, val) => sum + (val || 0), 0);

    fetch('https://valkyrriemeds-backend.onrender.com/api/assessment/save-assessment', {
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
        alert("Server error");
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
          
          <div className="email-input">
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
                      onChange={() => {
                        if (!submitted) {
                          const newAnswers = [...answers];
                          newAnswers[index] = parseInt(i);
                          setAnswers(newAnswers);
                        }
                      }}
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

          {submitted && (
            <div className="box">
              <strong>Your Score: {score}</strong><br />
              {resultMessage}
            </div>
          )}
        </section>

        <section>
          <h2>Subscription Plans</h2>
          <ul>
            <li><strong>Solo Serenity:</strong> Daily audios + tracker – ₹449/month</li>
            <li><strong>Group Heal Plan:</strong> Solo + Weekly live – ₹799/month</li>
          </ul>

          <button
  className="subscribe"
  onClick={() => {
    if (!user) {
      alert("Please login to subscribe.");
    } else {
      loadRazorpay(449);
    }
  }}
>
  Solo Serenity – ₹449/month
</button>

<button
  className="subscribe"
  onClick={() => {
    if (!user) {
      alert("Please login to subscribe.");
    } else {
      loadRazorpay(799);
    }
  }}
  style={{ marginLeft: '10px' }}
>
  Group Heal Plan – ₹799/month
</button>


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
        <p>Not sure where to begin? Mail us at: <strong>valkyrriemeds@gmail.com</strong></p>
      </div>

      <footer>
        &copy; 2025 Phoenix Femmes. All rights reserved.
      </footer>
    </div>
  );
};

export default Meditation;
