import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const PrivateRoute = ({ element: Element }) => {
    const { currentUser } = useAuth();
    const location = useLocation();
  
    if (!currentUser) {
      // Redirect to login page if user is not authenticated
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return Element;
  };
  
  export default PrivateRoute;
