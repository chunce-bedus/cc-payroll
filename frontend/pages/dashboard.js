import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic
    // Redirect to the signin page
    router.push('/signin');
  };

  useEffect(() => {
    // Fetch the logged-in user's data if necessary
  }, []);

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Welcome, <span id="worker-name">[Worker Name]</span></h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </header>
        <main className={styles.main}>
          <section className={styles.section}>
            <h2>Performance Trends</h2>
            {/* Performance trends chart or data goes here */}
          </section>
          <section className={styles.section}>
            <h2>Submit Grading Form</h2>
            <form id="grading-form" className={styles.form}>
              <label className={styles.label} htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" required className={styles.input} />

              <label className={styles.label} htmlFor="grading-form-number">Grading Form Number:</label>
              <input type="text" id="grading-form-number" name="grading-form-number" required className={styles.input} />

              <label className={styles.label} htmlFor="weight">Weight (MT):</label>
              <input type="number" id="weight" name="weight" step="0.01" required className={styles.input} />

              <label className={styles.label} htmlFor="grade">Grade:</label>
              <input type="text" id="grade" name="grade" required className={styles.input} />

              <label className={styles.label} htmlFor="headcount">Headcount:</label>
              <input type="number" id="headcount" name="headcount" required className={styles.input} />

              <button type="submit" className={styles.submitBtn}>Submit Grading Form</button>
            </form>
          </section>
          <section className={styles.section}>
            <h2>Salary Summary</h2>
            {/* Salary summary data goes here */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
