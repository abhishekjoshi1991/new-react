import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../helpers/useAuth";


function ProtectedRoutes({children}) {
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/register" />;
      }
      return children;
    
}

export default ProtectedRoutes