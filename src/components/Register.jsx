
 function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-green-100 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register Here</h2>
        
        <form >
        <form action='' className='flex flex-col gap-3'>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <div className="text-gray-700"></div>
            <input
              type="name"
               placeholder="Enter your Name"
              className="w-full px-3 py-2 border border-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
               placeholder="Enter your email"
              className="w-full px-3 py-2 border border-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-800 text-white py-2 px-4 rounded-xl hover:scale-110"
          >
            Register
          </button>
         </form>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Login now
          </a>
        </p>
      </div>
    </div>
  );
}
export default Register;