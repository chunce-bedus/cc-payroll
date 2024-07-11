import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GradingForm from '../components/GradingForm';

const GradingPage = () => {
  return (
    <div>
      <Header />
      <main>
        <GradingForm />
      </main>
      <Footer />
    </div>
  );
};

export default GradingPage;
