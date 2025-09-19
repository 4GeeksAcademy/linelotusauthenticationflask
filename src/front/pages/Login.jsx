import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    // Handle form submission (requirement: listen for onSubmit)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        
        console.log("1. Login form submitted!");
        console.log("2. Email:", email, "Password:", password);
        
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
        
        fetch("https://improved-space-doodle-g479rxrvw4pj29459-3001.app.github.dev/api/token", opts)
            .then(response => {
                console.log("4. Response received, status:", response.status);
                if (response.status === 200) return response.json();
                else {
                    alert("Invalid credentials!");
                    throw new Error("Login failed");
                }
            })
            .then(data => {
                console.log("5. Success backend data:", data);
                
                // Step 7: Save token in sessionStorage
                sessionStorage.setItem("token", data.access_token);
                console.log("6. Token saved to sessionStorage");
                
                // Step 8: Redirect to /private (or home page)
                navigate("/private");
                console.log("7. Redirected to private page");
            })
            .catch(error => { 
                console.log("8. Error caught:", error);
                console.error('An error occurred:', error);
            });
    }

    return (
        <div className="container">
            <h1 className="display-4">Login</h1>
            
            {(token && token != "" && token != undefined) ? 
                <div className="alert alert-success">
                    <p>You're already logged in!</p>
                    <button onClick={() => navigate("/private")} className="btn btn-primary">
                        Go to Private Page
                    </button>
                </div>
                : 
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
                        <button type="submit">Login</button>
                    </form>
                </div>
            }
        </div>
    );
};





















// import React, { useEffect, useState } from "react"
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// import { useNavigate } from "react-router-dom"; // Add this import

// export const Login = () => {

//     const { store, dispatch } = useGlobalReducer()
//     const[email,setEmail] = useState("")
//     const[password,setPassword] = useState("")

//     const token = sessionStorage.getItem("token");
//     const navigate = useNavigate(); 

//     const handleClick = () => {
//     console.log("1. Button clicked!"); // Confirms the function is called
//     console.log("2. Email:", email, "Password:", password); // Check if values are captured
    
//     const opts = {
//         method:'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             "email": email,
//             "password": password
//         })
//     };
    
//     console.log("3. About to make fetch request..."); // Confirms we reach the fetch
    
//     fetch("https://improved-space-doodle-g479rxrvw4pj29459-3001.app.github.dev/api/token", opts)
//         .then(response => {
//             console.log("4. Response received, status:", response.status); // See if request completed
//             if (response.status === 200) return response.json();
//             else alert("There's an error!");
//         })
//         .then(data =>{

//             console.log("5. Success backend data:", data);
//             sessionStorage.setItem("token", data.access_token);
            
//              // ADD THIS: Redirect to home page after successful login
//                 navigate("/");
//                 console.log("6. Redirected to home page");
//             })

//         .catch(error => { 
//             console.log("6. Error caught:", error); // See any errors
//             console.error('An error occurred:', error);
//         });
// }



//     // const loadMessage = async () => {
//     //     try {
//     //         const backendUrl = import.meta.env.VITE_BACKEND_URL

//     //         if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

//     //         const response = await fetch(backendUrl + "/api/hello")
//     //         const data = await response.json()

//     //         if (response.ok) dispatch({ type: "set_hello", payload: data.message })

//     //         return data

//     //     } catch (error) {
//     //         if (error.message) throw new Error(
//     //             `Could not fetch the message from the backend.
//     //             Please check if the backend is running and the backend port is public.`
//     //         );
//     //     }

//     // }

//     // useEffect(() => {
//     //     loadMessage()
//     // }, [])

//     return (

//        <div className="container">
//         <h1 className="display-4">Login</h1>
//                 {(token && token!="" && token!=undefined) ? "You're logged in with this token" + token : 
                
//                 <div className="text-center mt-5">
//                         <input type="text" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                   
//                         <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                   

//                     <button onClick={handleClick}  type="button">Login</button>  </div>
//            }
                

// </div>
    
//     );
// }; 
