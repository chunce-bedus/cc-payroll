import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SalaryCalculation from '../components/SalaryCalculation';

const SalaryPage = () => {
  return (
    <div>
      <Header />
      <main>
        <SalaryCalculation />
      </main>
      <Footer />
    </div>
  );
};

export default SalaryPage;
