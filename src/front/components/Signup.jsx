import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Signup = () => {
    const { store, dispatch } = useGlobalReducer()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    // Handle form submission (requirement: listen for onSubmit)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        
        console.log("1. Signup form submitted!");
        console.log("2. Email:", email, "Password:", password);

        // Basic validation
        if (password.length < 2) {
            alert("Password must be at least 2 characters long!");
            return;
        }

        const opts = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };

        console.log("3. About to make fetch request...");

        // POST to /signup endpoint (as per your working version)
        fetch("https://improved-space-doodle-g479rxrvw4pj29459-3001.app.github.dev/api/signup", opts)
            .then(response => {
                console.log("4. Response received, status:", response.status);
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    alert("User already exists or invalid data!");
                    throw new Error("Bad Request");
                } else {
                    alert("There's an error during signup!");
                    throw new Error("Signup failed");
                }
            })
            .then(data => {
                console.log("5. Success backend data:", data);
                alert("Account created successfully! You can now login.");
                // Redirect to login page after successful signup
                navigate("/login");
            })
            .catch(error => {
                console.log("6. Error caught:", error);
                console.error('An error occurred:', error);
            });
    }

    return (
        <div className="container">
            <h1 className="display-4">Sign Up</h1>
            
            <div className="text-center mt-5">
                {/* Form with onSubmit handler as per requirements */}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="email@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br /><br />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br /><br />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};




// import React, { useEffect, useState } from "react"
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// export const Signup = () => {
//     const { store, dispatch } = useGlobalReducer()
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const token = sessionStorage.getItem("token");

//     const handleClick = () => {
//         console.log("1. Signup button clicked!"); // Confirms the function is called
//         console.log("2. Email:", email, "Password:", password); // Check if values are captured

//         // Basic validation
//         if (password.length < 2) {
//             alert("Password must be at least 2 characters long!");
//             return;
//         }

//         const opts = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 "email": email,
//                 "password": password
//             })
//         };

//         console.log("3. About to make fetch request..."); // Confirms we reach the fetch

//         fetch("https://improved-space-doodle-g479rxrvw4pj29459-3001.app.github.dev/api/signup", opts)

//             .then(response => {
//     console.log("4. Response received, status:", response.status);
//     if (response.status === 201) {
//         return response.json();
//     } else if (response.status === 400) {
//         alert("User already exists or invalid data!");
//         throw new Error("Bad Request");
//     } else if (response.status === 405) {
//         alert("Method not allowed - check backend route configuration!");
//         throw new Error("Method Not Allowed");
//     } else {
//         alert("There's an error during signup!");
//         throw new Error("Signup failed");
//     }
// })
//             .then(data => {
//                 console.log("5. Success backend data:", data);
//                 alert("Account created successfully! You can now login.");
//                 // Optionally clear the form
//                 setEmail("");
//                 setPassword("");
//             })
//             .catch(error => {
//                 console.log("6. Error caught:", error); // See any errors
//                 console.error('An error occurred:', error);
//             });
//     }

//     return (
//         <div className="container">
//             <h1 className="display-4">Sign Up</h1>
            
//             {(token && token != "" && token != undefined) ? 
//                 "You're already logged in with token: " + token :
//                 <div className="text-center mt-5">
//                     <input 
//                         type="email" 
//                         placeholder="email@example.com" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                     />
                    
//                     <input 
//                         type="password" 
//                         placeholder="password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                     />
                    
//                     <button onClick={handleClick} type="button">Sign Up</button>
//                 </div>
//             }
//         </div>
//     );
// };