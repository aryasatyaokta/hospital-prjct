import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import Bpjs from './page/Bpjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './component/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ element: Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? Element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<PrivateRoute element={<Home />} />} />
          <Route path='/bpjs' element={<PrivateRoute element={<Bpjs />} />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
