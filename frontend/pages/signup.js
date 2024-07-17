// frontend/pages/signup.js

import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import styles from '../styles/forms.module.css'; // Import the CSS module

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collectionCenter: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/employees/signup', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Collection Center:
            <select
              name="collectionCenter"
              value={formData.collectionCenter}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select</option>
              <option value="MJM Bekenu">MJM Bekenu</option>
              <option value="MJM Beraya">MJM Beraya</option>
              <option value="MJM Karabungan">MJM Karabungan</option>
              <option value="MJM Kejapil">MJM Kejapil</option>
              <option value="MJM Pelapi">MJM Pelapi</option>
              <option value="MJM Tegageng">MJM Tegageng</option>
            </select>
          </label>
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
