import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl h-[650px]">
        {/* Left Panel */}
        <div className="bg-green-800 text-white md:w-2/5 w-full p-6 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-3 text-center">Excel Analytic Program</h2>
          <p className="text-sm text-center">
            Upload your Excel File to get <br /> 2D and 3D charts
          </p>
        </div>

        {/* Right Panel (Form) */}
        <div className="md:w-3/5 w-full p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center md:text-left">Forgot Password</h2>
          <p className="text-sm text-gray-600 mb-4 text-center md:text-left">
            Enter your email to receive a reset link.
          </p>

          <form className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Email Address</span>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </label>

            <button
              type="submit"
              className="bg-green-800 hover:bg-green-900 text-white font-semibold py-2 rounded-md transition"
            >
              Send Reset Link
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <a href="/login" className="text-green-800 hover:underline">Back to Login</a>
            <a href="/register" className="text-green-800 hover:underline">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
