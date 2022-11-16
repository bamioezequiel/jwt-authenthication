import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>} />
      </Routes>
    </div>
  );
}

export default App;
