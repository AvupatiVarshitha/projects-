import React, { useState } from 'react';
import axios from 'axios';




const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    college: '',
    collegeId: null,
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'collegeId') {
      setFormData({ ...formData, collegeId: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    console.log("📤 Submitting form...");

    if (!formData.collegeId) {
      setStatus('❌ Please upload your College ID file.');
      return;
    }

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('college', formData.college);
    data.append('collegeId', formData.collegeId);

    try {
      const response = await axios.post('https://valkyrriemeds-backend-1.onrender.com/api/appointment/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Server Response:', response.data);
      setStatus('✅ ' + response.data.message);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        college: '',
        collegeId: null,
      });
      e.target.reset();
    } catch (error) {
      if (error.response && error.response.status === 400) {
    setStatus('❌ Email already registered');
    alert('❌ Email already registered');
  } else {
    setStatus('❌ Failed to submit form');
    alert('❌ Failed to submit form');
    console.error('Error:', error.response?.data || error.message);
  }
    }
  };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email ID"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="college"
        placeholder="College Name"
        value={formData.college}
        onChange={handleChange}
        required
      />
      <label>Upload College ID:</label>
      <input
        type="file"
        name="collegeId"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleChange}
        required
      />
      <button type="submit">Submit for Verification</button>

      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </form>
  );
};

export default RegistrationForm;

