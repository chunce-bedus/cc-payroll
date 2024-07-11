import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalaryCalculation = () => {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    const fetchSalaries = async () => {
      const { data } = await axios.get('/api/salaries');
      setSalaries(data);
    };
    fetchSalaries();
  }, []);

  return (
    <div>
      <h1>Salary Calculation</h1>
      <ul>
        {salaries.map(salary => (
          <li key={salary.id}>{`Employee ID: ${salary.employeeId}, Amount: ${salary.amount}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalaryCalculation;
