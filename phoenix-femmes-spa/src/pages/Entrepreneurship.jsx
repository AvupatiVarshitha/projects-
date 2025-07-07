
import './Entrepreneurship-style.css'; // Add styling separately
import RegistrationForm from '../components/RegistrationForm';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Entrepreneurship = () => {
  const [accessType, setAccessType] = useState(null);
  const [showQR, setShowQR] = useState(false);

   const { user } = useContext(AuthContext);

  const toggleAccess = (type) => {
    setAccessType(type);
  };

  return (
    <div className="container">
      <h1>Entrepreneurship & Startup Development</h1>
      <p style={{ textAlign: 'center' }}>Ignite Your Startup Dream</p>
      <p>
        We empower future founders with practical resources, curated templates,
        and guided frameworks to turn their ideas into real ventures.
      </p>

      <div className="section">
        <h2>What’s Included</h2>
        <ul>
          <li>Business Plan Templates</li>
          <li>Investor Pitch Deck Formats</li>
          <li>Startup Financial Model Sheets</li>
          <li>Branding & Go-To-Market Guides</li>
          <li>Startup Legal & Registration Checklist</li>
          <li>Access to Founder Talks & Q&A Sessions</li>
        </ul>
      </div>

      <div className="section">
        <h2>How to Access</h2>
        <div className="access-blocks">
          <div
            className="access-option"
            onClick={() => toggleAccess('student')}
          >
            I’m a student from a trained college
          </div>
          <div
            className="access-option"
            onClick={() => toggleAccess('nonstudent')}
          >
            I’m not from a trained college
          </div>
        </div>

        {accessType === 'student' && (
  <div id="student-access">
    <h3>Student Registration Form</h3>
    <p>Submit college email & ID for verification</p>
    <RegistrationForm />
    <p>
      Once verified, you’ll receive lifetime free access to our
      Entrepreneurship Toolkit.
    </p>

    {user ? (
      user.isVerified ? (
        <div className="verified-pdfs">
          <h3>🎉 Verified Student Access</h3>
          <p>You can now access all the resources below:</p>
          <ul>
            <li><a href="/pdfs/business-plan.pdf" target="_blank">📄 Business Plan Template</a></li>
            <li><a href="/pdfs/pitch-deck.pdf" target="_blank">📄 Investor Pitch Deck</a></li>
            <li><a href="/pdfs/financial-model.pdf" target="_blank">📄 Startup Financial Model</a></li>
            <li><a href="/pdfs/branding-guide.pdf" target="_blank">📄 Branding Guide</a></li>
            <li><a href="/pdfs/legal-checklist.pdf" target="_blank">📄 Legal Checklist</a></li>
            <li><a href="/pdfs/founder-talks.pdf" target="_blank">🎥 Founder Talks Access</a></li>
          </ul>
        </div>
      ) : (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          🔒 Your ID is under review. You will get access once verified.
        </p>
      )
    ) : (
      <p style={{ color: 'red', marginTop: '1rem' }}>
        🔒 Please log in to view your access.
      </p>
    )}
  </div>
)}

        {accessType === 'nonstudent' && (
          <div id="nonstudent-access">
            <h3>Not from a Trained College? No Worries!</h3>
            <p>
              <strong>Startup Explorer</strong>
              <br />
              Access to templates, toolkits & recorded mentor sessions{' '}
              <strong>₹399/month</strong>
            </p>
           {!showQR ? (
  <button onClick={() => setShowQR(true)}>
    Subscribe Now
  </button>
) : (
  <div>
    <h4>Scan to Pay</h4>
    <img
      src="/qr-code.jpg"
      alt="QR Code"
      style={{ width: '250px', border: '1px solid #ccc', padding: '10px' }}
    />
    <p style={{ fontSize: '14px' }}>Use any UPI app to complete the ₹399 payment</p>
  </div>
)}

            <p>
              Need Support or Unsure About Eligibility?
              <br />
              Contact our team at{' '}
              <a href="mailto:support@example.com">support@example.com</a>
              <br />
              WhatsApp us at +91-XXXXXXXXXX
            </p>
          </div>
        )}
      </div>

      <div className="tagline">
        “Start where you are. Use what you have. Build what you dream.”
      </div>
    </div>
  );
};

export default Entrepreneurship;
