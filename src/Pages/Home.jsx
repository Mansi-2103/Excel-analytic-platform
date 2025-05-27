import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import Header from '../Components/Header.jsx';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-green-200'>
            <Navbar/>
            <Header/>
        </div>
    );
}

export default Home;