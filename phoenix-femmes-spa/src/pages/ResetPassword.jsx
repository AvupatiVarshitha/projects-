import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`https://valkyrriemeds-backend-1.onrender.com/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Password reset successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div className="register-container">
      <h2>Reset Your Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="register-form">
         <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🔓' : '🔒'}
          </span>
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <style>{`
        .password-wrapper {
          position: relative;
          width: 100%;
        }

        .password-wrapper input {
          width: 100%;
          padding-right: 40px;
        }

        .toggle-password {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          font-size: 1.2rem;
          color: #444;
          cursor: pointer;
          user-select: none;
        }

        .register-container {
          max-width: 400px;
          margin: auto;
          padding: 2rem;
          background: #fdfdfd;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .register-form input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .register-form button {
          width: 100%;
          padding: 10px;
          background-color: #706354;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .register-form button:hover {
          background-color: #5a5043;
        }

        h2 {
          text-align: center;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
