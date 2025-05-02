function Login(){
    return(
        <>
        <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-cyan-500 from 10% via-indigo-500 via 50% to-sky-500 to-100%">
            <div className='big -white px-10 py-20 rounded-3xl border-2 border-gray-100'>
                <h1 className="text-5xl font-bold align-text-top ">Welcome</h1>
                <p className='font-medium text-lg text-red-500 mt-4'>Welcome back! Please enter your details.</p>
                <div className='mt-8'>
                    <label className='text-lg font-medium'>Email</label>
                    <input
                      className='w-full border-2 border-blue-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder='Enter your email'
                      />
                </div>
                <div className='mt-8'>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                      className='w-full border-2 border-blue-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder='Enter your password'
                      />
                </div>
                <div>
                    <input
                       type="checkbox"
                       id='remember'
                       />
                       <label className='ml-2 font-mediumtext-base'>Remember for 30 days</label>
                </div>
               
               
                  <button className='bg-black-500 text-white px-4 py-2 rounded  border-2'>Forgot password </button>
 
   
 
            </div>
   
        </section>
        </>
 
    )
}
export default Login;
 