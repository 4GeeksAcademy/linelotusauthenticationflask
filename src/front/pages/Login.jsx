import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {

    const { store, dispatch } = useGlobalReducer()
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")

    const handleClick = () => {

        const opts = {
            method:'POST',
            body: JSON.stringify((
                {
            "email":email,
            "password":password
            }
            ))

        }
        fetch("https://improved-space-doodle-g479rxrvw4pj29459-3001.app.github.dev/api/token", opts)
            .then(response => {
                if (response.status === 200) return response.json();
                else alert("There's an error!");
                 })

            .then(data => console.log(data))

            .catch(error => { console.error('An error occurred:', error)});
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
       <form class="row g-3">
        <h1 className="display-4">Login</h1>
            <form>
                <div className="text-center mt-5">
                        <input type="text" className="form-control col-sm-10" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                <div className="text-center mt-5">
                        <input type="password" className="form-control col-sm-10" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                <div className="col-12">
                 <button onclick={handleClick} className="btn btn-primary" type="submit">Login</button>
                 </div>
            </form>
</form>
    
    );
}; 
