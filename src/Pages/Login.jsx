import React from "react";
import { useNavigate } from 'react-router-dom'

  const login = async () => {
    const navigate = useNavigate()
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

          <form className='flex flex-col gap-3'>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <button onClick={()=>navigate('/Dashboard')}
              type="submit"
              className="w-full bg-green-800 text-white p-2 rounded-xl hover:bg-green-900"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <p onClick={()=>navigate('/ResetPassword')} 
           className="text-sm">
            <a href="#" className="text-green-800 font-semibold hover:underline">
            Forget Password
            </a>
          </p>
            

          <p className="text-sm">
            Don’t have an account?{' '}
            <a onClick={()=>navigate('/register')}
            href="#" className="text-green-800 font-semibold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default login;