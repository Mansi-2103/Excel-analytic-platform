import React from 'react'
import { useNavigate } from 'react-router-dom'
const Header =() => {
     const navigate = useNavigate()
    return (
      <div className='flex flex-col items-center mt-40 px-8  text-center font-bold text-green-950'>
        <h1 className='flex items-center gap-2 text-4xl font-extrabold sm:text-3xl  mb-2'>Welcome to Excelanalytic</h1>
        <p className='mb-8 max-w-md'>Let's convert your Excel file in 2D and 3D charts</p>
        <button onClick={()=>navigate('/login')}
         className='border border-green-800 rounded-full px-8 py-2.5 hover:bg-green-800 transition-all'>Get Started </button>
      </div>
    );
}
export default Header;