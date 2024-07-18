import React from 'react';
import Link from 'next/link';
import styles from '../styles/index.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to CC Payroll</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href="/signup" legacyBehavior>
              <a className={styles.link}>Sign Up</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/signin" legacyBehavior>
              <a className={styles.link}>Sign In</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
