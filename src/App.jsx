import React, { useState } from "react";
import logo from "../src/assets/logo.png";

const LoanCalculator = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [downPayment, setDownPayment] = useState(299642);
  const [loanAmount, setLoanAmount] = useState(823290);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(9.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Function to calculate
  const calculateEMI = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = tenure;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return emi.toFixed(0);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-6">
      {/* Left: Loan Calculation Section */}
      <div className="w-full md:w-2/3 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700">
          <img src={logo} alt="Company Logo" className="w-32 h-auto" />
        </h2>

        {/* Name */}
        <div className="mt-6">
          <label className="block text-gray-600">Name:</label>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
          />
        </div>

        {/* Monthly Salary */}
        <div className="mt-4">
          <label className="block text-gray-600">Monthly Salary</label>
          <input
            type="text"
            placeholder="Enter your salary..."
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
          />
        </div>

        {/* Loan Amount Input */}
        <div className="mt-4">
          <label className="block text-gray-600">
            Amount to Borrow: ₦{loanAmount.toLocaleString()}
          </label>

          {/* Editable Input Field */}
          <input
            type="text"
            placeholder="Enter amount to borrow..."
            className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
      flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
      font-normal w-full h-12 text-xs rounded-md shadow-sm mb-5"
          />
        </div>

        {/* Down Payment and Interest Rate */}
        <div className="mt-10">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
            {/* Down Payment */}
            <label className="bg-purple-500 text-white px-4 py-2 rounded-md whitespace-nowrap">
              Down Payment:
            </label>
            <input
              value="411645"
              type="text"
              className="p-2 border border-gray-300 rounded-md w-full sm:w-48"
            />

            {/* Interest Rate */}
            <label className="bg-purple-500 text-white px-4 py-2 rounded-md whitespace-nowrap">
              Interest Rate:
            </label>
            <input
              value="10 %"
              type="text"
              className="p-2 border border-gray-300 rounded-md w-full sm:w-20"
            />
          </div>
        </div>

        {/* Buttons*/}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          {/* Calculate Button */}
          <button
            className="w-full sm:w-52 md:w-[139px] h-[56px] bg-purple-400 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all"
            onClick={() => setMonthlyPayment(calculateEMI())} // Update state on click
          >
            Calculate
          </button>

          {/* KYC Form Button */}
          <button className="w-full sm:w-52 md:w-[139px] h-[56px] bg-purple-400 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all">
            KYC Form
          </button>
        </div>
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
            <p className="text-4xl font-bold mb-4">{name || "Your Name"}</p>
            <div>
              <p className="text-sm">Eligible Loan Amount</p>
              <p className="text-2xl font-bold mt-1">
                ₦{loanAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <div className="mb-4">
            <p className="text-sm">Total Interest Payable</p>
            <p className="text-2xl font-bold mt-1">
              ₦{(calculateEMI() * tenure).toLocaleString()}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm">Fixed Interest</p>
            <p className="text-2xl font-bold mt-1">
              ₦{monthlyPayment.toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm">Monthly Payment</p>
            <p className="text-2xl font-bold mt-1">
              ₦{monthlyPayment.toLocaleString()}
            </p>
          </div>

          {/*Loan tenure, Payment Frequency & Breakdown of Payments */}
          <p className="text-xl font-bold mb-4 text-white"></p>
          <label className="mb-2 font-medium block">Loan Tenure:</label>
          <select
            type="select-one"
            className="p-2 border-2 w-full rounded-md mb-4 bg-purple-700"
          >
            <option value="12">12 Months</option>
            <option value="24">24 Months</option>
            <option value="36">36 Months</option>
          </select>
          <label className="mb-2 font-medium block">Payment Frequency:</label>
          <select
            type="select-one"
            className="p-2 border-2 w-full rounded-md mb-4 bg-purple-700"
          >
            <option value="Monthly">Monthly</option>
            <option value="Bi-weekly">Bi-weekly</option>
          </select>
          <p className="text-lg font-semibold mt-4">Payment Breakdown</p>
          <div className="overflow-x-auto">
            <table className="bg-white shadow-md mt-2 min-w-full border-b rounded">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Payment #</th>
                  <th className="py-2 px-4 text-left">Amount Paid</th>
                  <th className="py-2 px-4 text-left">Interest Paid</th>
                  <th className="py-2 px-4 text-left">Principal Paid</th>
                  <th className="py-2 px-4 text-left">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t">
                  <td className="py-2 px-4">Month 1</td>
                  <td className="py-2 px-4">₦8,141.67</td>
                  <td className="py-2 px-4">₦8,141.67</td>
                  <td className="py-2 px-4">₦0.00</td>
                  <td className="py-2 px-4">₦977,000.00</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-4">Month 2</td>
                  <td className="py-2 px-4">₦8,141.67</td>
                  <td className="py-2 px-4">₦8,141.67</td>
                  <td className="py-2 px-4">₦0.00</td>
                  <td className="py-2 px-4">₦968,858.33</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2 px-4">Month 3</td>
                  <td className="py-2 px-4">₦8,141.67</td>
                  <td className="py-2 px-4">₦8,141.67</td>
                  <td className="py-2 px-4">₦0.00</td>
                  <td className="py-2 px-4">₦960,716.67</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Button */}
          <div className="mt-8 flex flex-wrap sm:flex-nowrap justify-center gap-4">
            <button className="w-full sm:w-2/5 bg-white text-black py-3 rounded-lg shadow-md hover:bg-purple-400">
              Download Result
            </button>
            <button className="w-full sm:w-2/5 bg-white text-black py-3 rounded-lg shadow-md hover:bg-purple-400">
              Share Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
