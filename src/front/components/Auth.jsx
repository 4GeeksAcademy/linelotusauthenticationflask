import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const Auth = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            // Optional: Validate token with backend
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show loading while checking
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};