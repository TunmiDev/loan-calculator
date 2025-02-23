import React, { useState, useEffect } from "react";
import jsPDF from "jspdf"; // Import jsPDF
import logo from "../src/assets/logo.png";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const LoanCalculator = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0); // Initial loan amount
  const [tenure, setTenure] = useState(24); // in months
  const [interestRate, setInterestRate] = useState(9.5); // Fixed interest rate
  const [recurringPayments, setRecurringPayments] = useState(0);
  const [monthlyFrequency, setMonthlyFrequency] = useState("monthly");
  const [totalInterestPayable, setTotalInterestPayable] = useState(0);
  const [paymentBreakdown, setPaymentBreakdown] = useState([]); // New state for payment breakdown

  // Update down payment whenever loan amount changes
  useEffect(() => {
    setDownPayment(loanAmount / 2);
  }, [loanAmount]);

  // Function to calculate EMI
  const calculateEMI = () => {
    let rate, totalPayments;

    if (monthlyFrequency === "monthly") {
      rate = interestRate / 100 / 12; // Monthly rate
      totalPayments = tenure; // Total monthly payments
    } else {
      rate = interestRate / 100 / 26; // Bi-weekly rate
      totalPayments = (tenure / 12) * 26; // Total bi-weekly payments
    }

    const emi =
      (loanAmount * rate * Math.pow(1 + rate, totalPayments)) /
      (Math.pow(1 + rate, totalPayments) - 1);
    return emi;
  };

  // Function to calculate total interest payable
  const calculateTotalInterestPayable = (emi) => {
    const totalPayments =
      emi * (monthlyFrequency === "monthly" ? tenure : (tenure / 12) * 26); // Total payments made
    const totalInterest = totalPayments - loanAmount; // Total interest paid

    // Ensure total interest is not negative
    return totalInterest < 0 ? 0 : Math.ceil(totalInterest); // Round up
  };

  // Function to calculate payment breakdown
  const calculatePaymentBreakdown = (emi) => {
    const breakdown = [];
    let remainingBalance = loanAmount;
    const monthlyRate =
      interestRate / 100 / (monthlyFrequency === "monthly" ? 12 : 26); // Adjust rate based on frequency

    for (
      let month = 1;
      month <= (monthlyFrequency === "monthly" ? tenure : (tenure / 12) * 26);
      month++
    ) {
      const interestPayment = remainingBalance * monthlyRate;
      let principalPayment = emi - interestPayment;

      // Ensure principal payment is not negative
      if (principalPayment < 0) {
        principalPayment = 0; // Set to zero to avoid negative values
      }

      remainingBalance -= principalPayment;

      // Ensure remaining balance does not go negative
      if (remainingBalance < 0) {
        remainingBalance = 0; // Set to zero to avoid negative balance
      }

      breakdown.push({
        month,
        totalPayment: Math.ceil(emi), // Round up
        interestPayment: Math.ceil(interestPayment), // Round up
        principalPayment: Math.ceil(principalPayment), // Round up
        remainingBalance: Math.ceil(remainingBalance), // Round up
      });
    }

    setPaymentBreakdown(breakdown);
  };

  // Handle Calculate button click
  const handleCalculate = () => {
    const emi = calculateEMI();
    const maxMonthlyPayment = salary ? Math.ceil(Number(salary) * 0.3) : 0; // Calculate 30% of salary and round up

    // Check if the calculated EMI exceeds the maximum allowable payment
    if (emi > maxMonthlyPayment) {
      alert(
        `The monthly payment of ₦${Math.ceil(
          emi
        )} exceeds 30% of your salary (₦${maxMonthlyPayment}). Please adjust the loan amount or terms.`
      );
    } else {
      setRecurringPayments(Math.ceil(emi)); // Round up
      const totalInterest = calculateTotalInterestPayable(emi);
      setTotalInterestPayable(totalInterest);
      calculatePaymentBreakdown(emi); // Pass the EMI to generate the breakdown
    }
  };

  // Function to generate and download PDF
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(`Loan Details`, 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Loan Amount: ₦${Math.ceil(loanAmount).toLocaleString()}`, 10, 30);
    doc.text(
      `Total Interest Payable: ₦${Math.ceil(
        totalInterestPayable
      ).toLocaleString()}`,
      10,
      40
    );
    doc.text(
      `Monthly Payment: ₦${Math.ceil(recurringPayments).toLocaleString()}`,
      10,
      50
    );
    doc.text(`Payment Frequency: ${monthlyFrequency}`, 10, 60);
    doc.text(`Tenure: ${tenure} months`, 10, 70);
    doc.save("loan_details.pdf"); // Specify the file name
  };

  // Share URL and title for sharing
  const shareUrl = window.location.href; // URL to share
  const title =
    `Loan Amount: ₦${Math.ceil(loanAmount).toLocaleString()}\n` +
    `Total Interest Payable: ₦${Math.ceil(
      totalInterestPayable
    ).toLocaleString()}\n` +
    `Monthly Payment: ₦${Math.ceil(recurringPayments).toLocaleString()}\n` +
    `Name: ${name}`;

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
          <label className="block text-gray-600">
            Monthly Salary: ₦{Math.ceil(salary).toLocaleString()}
          </label>
          <input
            type="text"
            placeholder="Enter your salary..."
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
          />
        </div>

        {/* Loan Amount Input */}
        <div className="mt-4">
          <label className="block text-gray-600">
            Amount to Borrow: ₦{Math.ceil(loanAmount).toLocaleString()}
          </label>

          {/* Editable Input Field */}
          <input
            type="text"
            placeholder="Enter amount to borrow..."
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
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
              Down Payment: ₦{Math.ceil(downPayment).toLocaleString()}
            </label>

            {/* Interest Rate */}
            <label className="bg-purple-500 text-white px-4 py-2 rounded-md whitespace-nowrap">
              Interest Rate:
            </label>
            <input
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
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
            onClick={handleCalculate} // Update state on click
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
                ₦{Math.ceil(loanAmount).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <div className="mb-4">
            <p className="text-sm">Total Interest Payable</p>
            <p className="text-2xl font-bold mt-1">
              ₦{Math.ceil(totalInterestPayable).toLocaleString()}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm">Fixed Interest</p>
            <p className="text-2xl font-bold mt-1">
              ₦{Math.ceil(recurringPayments).toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm">Monthly Payment</p>
            <p className="text-2xl font-bold mt-1">
              ₦{Math.ceil(recurringPayments).toLocaleString()}
            </p>
          </div>

          {/* Loan tenure, Payment Frequency & Breakdown of Payments */}
          <p className="text-xl font-bold mb-4 text-white"></p>
          <label className="mb-2 font-medium block">Loan Tenure:</label>
          <select
            type="select-one"
            className="p-2 border-2 w-full rounded-md mb-4 bg-purple-700"
            onChange={(e) => setTenure(Number(e.target.value))}
            value={tenure}
          >
            <option value="12">12 Months</option>
            <option value="24">24 Months</option>
            <option value="36">36 Months</option>
          </select>
          <label className="mb-2 font-medium block">Payment Frequency:</label>
          <select
            type="select-one"
            className="p-2 border-2 w-full rounded-md mb-4 bg-purple-700"
            onChange={(e) => setMonthlyFrequency(e.target.value)}
            value={monthlyFrequency}
          >
            <option value="monthly">Monthly</option>
            <option value="bi-weekly">Bi-weekly</option>
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
                {paymentBreakdown.map((payment) => (
                  <tr className="border-t" key={payment.month}>
                    <td className="py-2 px-4">Month {payment.month}</td>
                    <td className="py-2 px-4">
                      ₦{payment.totalPayment.toFixed(2)}
                    </td>
                    <td className="py-2 px-4">₦{payment.interestPayment}</td>
                    <td className="py-2 px-4">₦{payment.principalPayment}</td>
                    <td className="py-2 px-4">₦{payment.remainingBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download and Share Buttons in Output Section */}
          <div className="mt-8 flex flex-wrap sm:flex-nowrap justify-center gap-4">
            <button
              className="w-full sm:w-2/5 bg-white text-black py-3 rounded-lg shadow-md hover:bg-purple-400"
              onClick={handleDownload} // Trigger PDF download
            >
              Download Result
            </button>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
