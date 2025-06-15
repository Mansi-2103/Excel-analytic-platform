import { Outlet, NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const matchDashboard = useMatch('/dashboard');
  const showWelcome = matchDashboard !== null;

  const userName = "Mansi"; // Replace with dynamic auth value when ready

  const navItems = [
    { path: '/dashboard/upload', label: '📁 Upload Excel' },
    { path: '/dashboard/analyze', label: '📊 Analyze Data' },
    { path: '/dashboard/history', label: '🕒 History' },
    { path: '/dashboard/downloads', label: '⬇️ Downloads' },
    { path: '/dashboard/aiinsights', label: '💡 AI Sights' },
    { path: '/dashboard/settings', label: '⚙️ Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const dashboardFeatures = [
    {
      title: 'Data Explorer',
      desc: 'Interactively explore your Excel data with filters, search, and dynamic sorting.',
      icon: '🔍',
    },
    {
      title: 'Multi-Chart Views',
      desc: 'Visualize your data in multiple formats side-by-side: line, pie, bar, and 3D.',
      icon: '📊',
    },
    {
      title: 'Auto Summary Reports',
      desc: 'Get downloadable insights like totals, averages, trends, and AI-written summaries.',
      icon: '📝',
    },
  ];

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-900 to-green-700 text-white flex flex-col px-6 py-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-10 tracking-wide">📊 Dashboard</h2>
        <nav className="flex flex-col gap-3 text-base">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-green-900 font-semibold'
                    : 'hover:bg-green-800 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-cyan-50 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${userName}&background=16a34a&color=fff&bold=true`}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="text-xl md:text-2xl font-bold text-green-900">
              Hello, {userName}! 👋
            </h2>
          </div>
          <button
            onClick={handleLogout}
            className="bg-green-700 text-white px-4 py-2 rounded-full shadow hover:bg-green-800 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Welcome Panel */}
        {showWelcome && (
          <>
            <div className="bg-white p-8 rounded-3xl shadow-md border border-green-100 transition duration-300">
              <h1 className="text-3xl font-bold mb-3 text-green-900 flex items-center gap-2">
                👋 Welcome to Excel Analytic Platform
              </h1>
              <p className="text-green-700 text-lg">
                Upload files, visualize data, and gain AI-powered insights in one place.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {dashboardFeatures.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-3xl border border-green-100 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">{item.title}</h3>
                  <p className="text-green-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Nested Route Content */}
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
