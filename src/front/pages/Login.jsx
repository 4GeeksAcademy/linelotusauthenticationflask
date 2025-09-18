import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {

    const { store, dispatch } = useGlobalReducer()
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")

    const handleClick = () => {
    console.log("1. Button clicked!"); // Confirms the function is called
    console.log("2. Email:", email, "Password:", password); // Check if values are captured
    
    const opts = {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    };
    
    console.log("3. About to make fetch request..."); // Confirms we reach the fetch
    
    fetch("https://improved-space-doodle-g479rxrvw4pj29459-3001.app.github.dev/api/token", opts)
        .then(response => {
            console.log("4. Response received, status:", response.status); // See if request completed
            if (response.status === 200) return response.json();
            else alert("There's an error!");
        })
        .then(data => console.log("5. Success data:", data))
        
        .catch(error => { 
            console.log("6. Error caught:", error); // See any errors
            console.error('An error occurred:', error);
        });
}



    // const loadMessage = async () => {
    //     try {
    //         const backendUrl = import.meta.env.VITE_BACKEND_URL

    //         if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

    //         const response = await fetch(backendUrl + "/api/hello")
    //         const data = await response.json()

    //         if (response.ok) dispatch({ type: "set_hello", payload: data.message })

    //         return data

    //     } catch (error) {
    //         if (error.message) throw new Error(
    //             `Could not fetch the message from the backend.
    //             Please check if the backend is running and the backend port is public.`
    //         );
    //     }

    // }

    // useEffect(() => {
    //     loadMessage()
    // }, [])

    return (

       <div className="container">
        <h1 className="display-4">Login</h1>
           
                <div className="text-center mt-5">
                        <input type="text" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                <div className="text-center mt-5">
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button onClick={handleClick}  type="button">Login</button>

</div>
    
    );
}; 
