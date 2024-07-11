import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmployeeList from '../components/EmployeeList';

const EmployeesPage = () => {
  return (
    <div>
      <Header />
      <main>
        <EmployeeList />
      </main>
      <Footer />
    </div>
  );
};

export default EmployeesPage;
