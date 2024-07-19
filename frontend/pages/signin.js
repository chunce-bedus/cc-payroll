import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/signin.module.css'; // Import the CSS file

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const response = await axios.post('http://localhost:5000/api/employees/signin', formData);
      console.log(response.data);
      // Redirect to the dashboard page after a successful sign-in
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} />
        </label>
        <label className={styles.label}>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className={styles.input} />
        </label>
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
      <Footer />
    </div>
  );
};

export default SignIn;
