import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
          const navigate = useNavigate()
    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
            <h2>Excel Analytic </h2>

            <button onClick={()=>navigate('/login')}
            className='flex items-center gap-2 border border-green-800 rounded-full px-6 py-2 text-black hover:bg-green-900 transition-all'>Login</button>
        </div>
    )
}

export default Navbar;