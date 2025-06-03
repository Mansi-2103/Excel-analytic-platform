import { Outlet, NavLink, useLocation,useMatch } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
 
   const matchDashboard = useMatch('/dashboard');
   const showWelcome = matchDashboard !== null;


  return (
    <div className="flex h-screen w-full">
      
      <div className="w-64 bg-green-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink to="/dashboard/upload" className="hover:text-gray-200">📁 Upload Excel</NavLink>
          <NavLink to="/dashboard/analyze" className="hover:text-gray-200">📊 Analyze Data</NavLink>
          <NavLink to="/dashboard/history" className="hover:text-gray-200">🕒 History</NavLink>
          <NavLink to="/dashboard/downloads" className="hover:text-gray-200">⬇️ Downloads</NavLink>
          <NavLink to="/dashboard/ai-sights" className="hover:text-gray-200">💡 AI Sights</NavLink>
          <NavLink to="/dashboard/settings" className="hover:text-gray-200">⚙️ Settings</NavLink>
        </nav>
      </div>

      
      <div className="flex-1 bg-cyan-50 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Excel Platform</h2>
          <button className="bg-white border px-4 py-2 rounded hover:bg-gray-100">Logout</button>
        </div>

        
        {showWelcome && (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-2">Welcome to Excel Analytic Platform</h1>
            <p className="text-gray-600">You have successfully logged in. Your analytics and uploads will appear here.</p>
          </div>
        )}

        
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
