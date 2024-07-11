import React, { useState } from 'react';
import axios from 'axios';

const GradingForm = () => {
  const [form, setForm] = useState({
    date: '',
    formNumber: '',
    weight: '',
    grade: '',
    headcount: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/gradingForms', form);
  };

  return (
    <div>
      <h1>Add Grading Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="text" name="formNumber" value={form.formNumber} onChange={handleChange} required />
        <input type="number" name="weight" value={form.weight} onChange={handleChange} required />
        <input type="number" name="grade" value={form.grade} onChange={handleChange} required />
        <input type="number" name="headcount" value={form.headcount} onChange={handleChange} required />
        <button type="submit">Add Form</button>
      </form>
    </div>
  );
};

export default GradingForm;
