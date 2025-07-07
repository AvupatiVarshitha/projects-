import React, { useState } from 'react';
import './Register.css'; // ✅ Import CSS file
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

   const [message, setMessage] = useState('');
   const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://valkyrriemeds-backend-1.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

   if (res.ok) {
      setMessage('✅ Registration successful! Check your email to verify your account.');
      setFormData({ name: '', email: '', password: '' });
    } else {
      setMessage(`❌ ${data.message}`);
    }
  };


  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input 
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
         <div className="password-wrapper">
          <input 
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span 
            className="toggle-password" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <button type="submit">Register</button>
      </form>

      <p>Already have an account? <span onClick={() => navigate('/login')} className="login-link">Login</span></p>
    </div>
  );
};

export default Register;

