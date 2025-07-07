import React, { useState, useContext} from 'react';
import './Register.css'; // ✅ Reuse the same CSS
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://valkyrriemeds-backend-1.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user, data.token); // ✅ Save user & token
      alert('✅ Login Successful');
      navigate('/');
    } else {
      alert(`❌ ${data.message}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <div className="password-field">
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

        <button type="submit">Login</button>
      </form>
      <p className="forgot-password" onClick={() => navigate('/forgot-password')}>
  Forgot Password?
</p>


      <p>Don't have an account? <span onClick={() => navigate('/register')} className="login-link">Register</span></p>
    </div>
  );
};

export default Login;
