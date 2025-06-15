import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Upload & Analyze Excel',
            description: 'Easily upload Excel files and automatically convert them into interactive datasets for analysis.',
            icon: '📊',
        },
        {
            title: '2D & 3D Chart Visualization',
            description: 'Visualize your data with beautiful and dynamic 2D/3D charts using Chart.js and Three.js.',
            icon: '📈',
        },
        {
            title: 'AI Insights',
            description: 'Let our AI analyze your data and suggest trends, outliers, and opportunities.',
            icon: '🤖',
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-green-900">
           
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-gradient-to-r from-green-100 via-white to-green-200">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Empower Your <span className="text-green-700">Excel Data</span>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl text-green-800">
                    Upload spreadsheets, visualize complex patterns, and unlock AI-powered insights effortlessly.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="mt-8 px-8 py-3 bg-green-700 text-white font-semibold rounded-full shadow-lg hover:bg-green-800 transition transform hover:scale-105"
                >
                    Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">🔍 Platform Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-green-50 border border-green-200 rounded-3xl shadow-md p-8 flex flex-col items-center text-center transform transition hover:scale-105 hover:shadow-xl"
                        >
                            <div className="text-6xl mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2 text-green-900">{feature.title}</h3>
                            <p className="text-green-700 text-base">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-900 text-white py-8 text-center mt-auto">
                <p className="text-lg font-medium mb-2">© 2025 Excel Analytics Platform</p>
                <p className="text-sm text-green-300">
                    Built with ❤️ using <strong>MERN</strong>, <strong>Chart.js</strong>, <strong>Three.js</strong>, and <strong>AI</strong>
                </p>
            </footer>
        </div>
    );
};

export default Home;
