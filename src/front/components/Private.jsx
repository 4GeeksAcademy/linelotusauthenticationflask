import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    
    // Step 3: Token validation in useEffect (early during component loading)
    useEffect(() => {
        console.log("1. Private page loading - checking token...");
        
        const token = sessionStorage.getItem("token");
        
        // Step 4: If no token, redirect to login
        if (!token || token === "" || token === undefined) {
            console.log("2. No token found - redirecting to login");
            navigate("/login");
            return;
        }
        
        // Step 5: Token exists, user is logged in
        console.log("3. Token found - user is authenticated:", token);
    }, [navigate]);

    // Logout functionality (requirements: User logout)
    const handleLogout = () => {
        console.log("1. Logout button clicked!");
        
        // Step 3: Remove token from sessionStorage
        sessionStorage.removeItem("token");
        console.log("2. Token removed from sessionStorage");
        
        // Step 4: Redirect to home page (public)
        navigate("/");
        console.log("3. Redirected to home page");
    };

    return (
        <div className="container">
            {/* Logout button as per requirements */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-4">Private Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="btn btn-danger"
                >
                    Logout
                </button>
            </div>

            <div className="alert alert-success">
                <h4>🎉 Welcome to your private area!</h4>
                <p>You are successfully authenticated and can access this protected content.</p>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Protected Content 1</h5>
                            <p className="card-text">This content is only visible to authenticated users.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Protected Content 2</h5>
                            <p className="card-text">Another piece of private information.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">User Dashboard</h5>
                            <p className="card-text">Your personal dashboard with sensitive data.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h5>Your Session Info:</h5>
                <code>Token: {sessionStorage.getItem("token")}</code>
            </div>
        </div>
    );
};















// components/Private.jsx???????????
// import React, { useEffect, useState } from "react";

// export const Private = () => {
//     const [userData, setUserData] = useState(null);
//     const token = sessionStorage.getItem("token");

//     const handleLogout = () => {
//         sessionStorage.removeItem("token");
//         window.location.href = "/"; // Redirect to home
//     };

//     useEffect(() => {
//         // Fetch private data using the token
//         const opts = {
//             method: 'GET',
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         };

//         fetch("https://improved-space-doodle-g479rxrvw4pj29459-3001.app.github.dev/api/private", opts)
//             .then(response => response.json())
//             .then(data => setUserData(data))
//             .catch(error => console.error('Error:', error));
//     }, [token]);

//     return (
//         <div>
//             <h1>Private Area</h1>
//             <p>Welcome! You are logged in.</p>
//             {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };