import { useNavigate } from "react-router-dom";
import Upload from "../Components/uploadFile.jsx";

const Dashboard = () => {
    const navigate = useNavigate();
    return (
      <div className="flex h-screen bg-gray-100">
   
        <aside className="w-64 bg-green-600 text-white flex flex-col p-4 rounded-tl-* rounded-bl-*">
          <h1 className="text-2xl font-bold mb-10">Dashboard</h1>
          <div className="flex h-screen bg-gray-100">
         <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Excel Analytics</h2>
        <ul className="space-y-4">
          <li>
            <label
              onClick={() => setSelectedTab("upload")}
              className="w-full text-left hover:text-blue-600"
            >
              <Upload/>
            </label>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("analyze")}
              className="w-full text-left hover:text-blue-600"
            >
              📊 Analyze
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("history")}
              className="w-full text-left hover:text-blue-600"
            >
              🕒 History
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("ai")}
              className="w-full text-left hover:text-blue-600"
            >
              🤖 AI Insights
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab("settings")}
              className="w-full text-left hover:text-blue-600"
            >
              ⚙️ Settings
            </button>
          </li>
        </ul>
      </div>
    
    </div>
         
        </aside>
 
     
        <main className="flex-1 bg-cyan-50 p-8 relative">
         
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-800 font-semibold">Excel Platform</span>
            <button className="bg-white border border-gray-300 px-4 py-1 rounded hover:bg-gray-100">
              Logout
            </button>
          </div>
 
       
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-2">Welcome to Excel Analytic Platform </h2>
            <p className="text-gray-600">
              You have successfully logged in. Your analytics and uploads will appear here.
            </p>
          </div>
        </main>
      </div>
    );
    

}
  
  function SidebarLink({ icon, label, active }) {
    return (
      <div
        className={`flex items-center px-4 py-2 rounded cursor-pointer ${
          active ? 'bg-white text-green-800 font-semibold' : 'hover:bg-green-800'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </div>
    );
  }
   
  export default Dashboard;