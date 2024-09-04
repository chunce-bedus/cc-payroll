import React from 'react';
import Link from 'next/link';
import '../styles/index.css';

const HomePage = () => {
  return (
    <div>
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
    </div>
  );
};

export default HomePage;
