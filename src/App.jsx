import React from "react";

const index = () => {
  return (
    <div>
      <div>
        <div>
          <div className="mx-auto bg-white rounded-lg shadow-lg max-w-4xl p-6">
            <p className="text-2xl font-bold text-gray-800 mb-6">
              Interactive Loan Calculator
            </p>
            <form className="md:grid-cols-2 space-y-4 grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block">
                  Income Amount
                </label>
                <input
                  type="text"
                  placeholder="Enter..."
                  className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">
                  Amount to be Borrowed
                </label>
                <input
                  type="text"
                  placeholder="Enter..."
                  className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">
                  Down Payment (Fixed)
                </label>
                <input
                  type="text"
                  placeholder="Enter..."
                  className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block">
                  Interest Rate (Fixed)
                </label>
                <input
                  type="text"
                  placeholder="Enter..."
                  className="focus:border-indigo-700 focus:outline-none focus:shadow-outline
            flex-grow transition duration-200 appearance-none p-2 border-2 border-gray-300 text-black bg-gray-100
            font-normal w-full h-12 text-xs rounded-md shadow-sm"
                />
              </div>
              <div className="md:col-span-2 justify-end col-span-1 flex">
                <button
                  type="button"
                  className="inline-flex border border-indigo-500 focus:outline-none focus:ring-2
            focus:ring-indigo-500 focus:ring-offset-2 justify-center rounded-md py-2 px-4 bg-indigo-600 text-sm
            font-medium text-white shadow-sm"
                >
                  Calculate
                </button>
              </div>
            </form>
            <div className="bg-purple-700 rounded-lg w-full justify-between text-white p-6 max-w-4xl flex space-x-4 mt-12">
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
              <div className="text-right">
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
            <div className="justify-end mt-6 flex space-x-4">
              <button
                type="button"
                className="inline-flex border border-indigo-500 focus:outline-none focus:ring-2
          focus:ring-indigo-500 focus:ring-offset-2 justify-center rounded-md py-2 px-4 bg-indigo-600 text-sm
          font-medium text-white shadow-sm"
              >
                Download Details
              </button>
              <button
                type="button"
                className="inline-flex border border-gray-500 focus:outline-none focus:ring-2
          focus:ring-indigo-500 focus:ring-offset-2 justify-center rounded-md py-2 px-4 bg-gray-600 text-sm font-medium
          text-white shadow-sm"
              >
                Share Details
              </button>
              <button
                type="button"
                className="inline-flex border border-gray-500 focus:outline-none focus:ring-2
          focus:ring-indigo-500 focus:ring-offset-2 justify-center rounded-md py-2 px-4 bg-gray-600 text-sm font-medium
          text-white shadow-sm"
              >
                KYC Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
