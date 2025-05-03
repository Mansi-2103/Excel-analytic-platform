function Login(){
    return(

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-background">
        <div className="bg-white bg-opacity-90 px-10 py-12 rounded-2xl shadow-2xl w-full max-w-md font-sans backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-center text-indigo-800 mb-4">Welcome</h1>
          <p className="text-center text-gray-600 mb-8">Log in to Excel Analytics Platform ✨</p>
  
          <form>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                required
                className="peer w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-pink-500"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4">
                Email address
              </label>
            </div>
  
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
                required
                className="peer w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-pink-500"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4">
                password
              </label>
            </div>
  
            <div className="flex items-center mb-6">
              <input type="checkbox" id="remember" className="mr-2 accent-pink-500" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
  
            <div className="flex justify-between gap-4">
              <button
                type="button"
                className="w-full border-2 border-pink-500 text-pink-500 rounded-lg px-4 py-2 hover:bg-pink-100 transition"
              >
                Forgot Password
              </button>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition"
              >
                Log In
              </button>
            </div>
            <br />
            <div className="flex justify-between gap-4">
              
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
 
    )
}
export default Login;