import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Home from './Pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import UploadExcel from "./Components/UploadExcel.jsx";
import ChartDashboard from "./Components/ChartDashboard.jsx";
import History from "./Components/History.jsx";
import ForgotPassword from "./Components/ForgetPassword.jsx";
import AnalyzeData from "./Components/AnalyzeData.jsx";
import AIInsights from "./Components/AiInsights.jsx";
import DownloadHistory from "./Components/DownloadHistory.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgetpassword' element={<ForgotPassword />} />

        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='upload' element={<UploadExcel />} />
          <Route path='chart' element={<ChartDashboard />} />
          <Route path='history' element={<History />} />
          <Route path='analyze' element={<AnalyzeData />} />
          <Route path='aiinsights' element={<AIInsights />} />
          <Route path='downloads' element={<DownloadHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
