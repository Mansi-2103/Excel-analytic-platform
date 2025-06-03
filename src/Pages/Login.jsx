import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from "../Context/AppContext"; 

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { backendurl, setIsLoggedin, setUserData } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Show message from redirected logout (optional)
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendurl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         credentials: "include",
        body: JSON.stringify({ email, password })
  
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedin(true);
        setUserData({ name: data.user.name, email: data.user.email }); // Save logged in user
        setMessage(data.message || "Login successful");
        setError('');
        navigate("/Dashboard");
      } else {
        setError(data.message || "Login failed");
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 pt-10">
      <div className="bg-gray-100 flex rounded-xl shadow-lg max-w-3xl p-5">

        <div className="w-1/3 bg-green-800 text-white p-6 flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-2">Welcome to Excel Analytic Program</h2>
          <p>Upload your Excel File to get 2D and 3D charts</p>
        </div>

        <div className="w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="mb-6 text-sm text-gray-600">If you already a member, easily login</p>

          <form className='flex flex-col gap-3' onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-800 text-white p-2 rounded-xl hover:bg-green-900"
            >
              Login
            </button>
          </form>

          {/* ✅ Show success or error messages */}
          {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <p onClick={() => navigate('/ResetPassword')} className="text-sm">
            <a className="text-green-800 font-semibold hover:underline">Forget Password</a>
          </p>

          <p className="text-sm">
            Don’t have an account?{' '}
            <a onClick={() => navigate('/register')} className="text-green-800 font-semibold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
