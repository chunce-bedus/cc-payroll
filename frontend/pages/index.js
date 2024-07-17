// frontend/pages/index.js

import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/forms.css';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Welcome to CC Payroll</h1>
        <nav>
          <ul>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
