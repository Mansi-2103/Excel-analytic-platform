import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Home from './Pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import UploadExcel from "./Components/UploadExcel.jsx";
import ChartDashboard from "./Components/ChartDashboard.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='upload' element={<UploadExcel />} />
          <Route path='chart' element={<ChartDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
