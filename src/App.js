import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import Bpjs from './page/Bpjs';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/bpjs' element={<Bpjs/>}></Route>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
