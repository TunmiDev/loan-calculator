import React, { useState } from "react";
import logo from "../src/assets/logo.png";

const LoanCalculator = () => {
  const [downPayment, setDownPayment] = useState(299642);
  const [loanAmount, setLoanAmount] = useState(823290);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(9.5);

  // Function to calculate EMI
  const calculateEMI = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return emi.toFixed(0); // Rounded EMI
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6">
      {/* Left: Loan Calculation Section */}
      <div className="w-full md:w-2/3 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700">
          <img src={logo} alt="" className="w-32 h-auto" />
        </h2>

        {/* Name */}
        <div className="mt-6">
          <label className="block text-gray-600">Name:</label>
          <input
            type="text"
            placeholder="Enter..."
            className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
          />
        </div>
        {/* Tenure Slider */}
        <div className="mt-4">
          <label className="block text-gray-600">Monthly Salary</label>
          <input
            type="text"
            placeholder="Enter..."
            className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
          />
        </div>
        {/* Loan Amount Slider */}
        <div className="mt-4">
          <label className="block text-gray-600">
            Amount to Borrow: ₦{loanAmount.toLocaleString()}
          </label>
          <input
            type="range"
            min="200000"
            max="1500000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Button */}
        <button className="mt-6 w-full bg-gray-800 text-white py-3 rounded-lg shadow-md hover:bg-gray-900">
          Calculate
        </button>
      </div>

      {/* Loan Results */}
      <div className="w-full md:w-1/3 bg-purple-700 text-white p-6 rounded-lg md:ml-6 mt-6 md:mt-0">
        <div className="bg-purple-700 rounded-lg w-full justify-between text-white p-6 max-w-4xl flex space-x-4">
          <div>
            <div className="items-center mb-4 flex space-x-2">
              <div className="w-8 h-8 items-center justify-center rounded-full bg-white text-purple-700 flex">
                <span>👤</span>
              </div>
              <span className="text-lg">Result for</span>
            </div>
            <p className="text-4xl font-bold mb-4">Your Name</p>
            <div>
              <p className="text-sm">Amount Borrowed</p>
              <p className="text-2xl font-bold mt-1">₦0.00</p>
            </div>
            <div className="mt-4">
              <p className="text-sm">Down Payment</p>
              <p className="text-2xl font-bold mt-1">₦0.00</p>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <div clas="mb-4">
            <p className="text-sm">Total Repayment Amount</p>
            <p className="text-2xl font-bold mt-1">₦0.00</p>
          </div>
          <div clas="mb-4">
            <p className="text-sm">Customer earns</p>
            <p className="text-2xl font-bold mt-1">
              ₦0.00
              <span className="text-xs">(1 YR)</span>
            </p>
          </div>
          <div clas="mb-4">
            <p className="text-sm">Monthly Payment</p>
            <p className="text-2xl font-bold mt-1">₦0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
