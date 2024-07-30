// backend/utils/salaryCalculator.js

const calculateSalaryAmount = (grade, weight, headcount) => {
  let rate = 0;

  if (grade >= 98) {
    rate = 10.00;
  } else if (grade === 97) {
    rate = 8.50;
  } else if (grade === 96) {
    rate = 7.50;
  } else if (grade === 95) {
    rate = 6.50;
  } else if (grade === 94) {
    rate = 6.00;
  } else if (grade === 93) {
    rate = 5.50;
  } else if (grade === 92) {
    rate = 5.00;
  } else if (grade === 91) {
    rate = 4.50;
  } else if (grade === 90) {
    rate = 4.00;
  } else {
    rate = 3.00;
  }

  // Calculate the salary amount
  const salaryAmount = (weight * rate) / headcount;
  return salaryAmount;
};

module.exports = {
  calculateSalaryAmount
};
