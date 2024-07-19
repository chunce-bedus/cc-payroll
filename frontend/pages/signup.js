import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/signup.module.css'; // Import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collectionCenter: ''
  });
  const router = useRouter();

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
      // Redirect to the sign-in page after a successful sign-up
      router.push('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      
      <div className={styles.container}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              className={styles.input}
            >
              <option value="">Select a Center</option>
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
