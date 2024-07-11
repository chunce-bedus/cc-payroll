import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/employees">Employees</Link></li>
          <li><Link href="/grading">Grading Forms</Link></li>
          <li><Link href="/salary">Salary Calculation</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
