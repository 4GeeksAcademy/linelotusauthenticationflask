import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer()
    const token = sessionStorage.getItem("token");

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

            const response = await fetch(backendUrl + "/api/hello")
            const data = await response.json()

            if (response.ok) dispatch({ type: "set_hello", payload: data.message })

            return data

        } catch (error) {
            if (error.message) throw new Error(
                `Could not fetch the message from the backend.
                Please check if the backend is running and the backend port is public.`
            );
        }
    }

    useEffect(() => {
        loadMessage()
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Welcome to My App!</h1>
            
            <div className="alert alert-info">
                {store.message ? (
                    <span>{store.message}</span>
                ) : (
                    <span className="text-danger">
                        Welcome to the Landing Page!
                    </span>
                )}
            </div>

            <div className="mt-4">
                {/* Show different options based on authentication status */}
                {token ? (
                    <div>
                        <div className="alert alert-success">
                            <p>You are logged in! 🎉</p>
                        </div>
                        <Link to="/private">
                            <button className="btn btn-primary me-2">Go to Private Area</button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p className="lead">Please login or create an account to access private content.</p>
                        <Link to="/login">
                            <button className="btn btn-primary me-2">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-success">Sign Up</button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="mt-5">
                <h5>Public Content</h5>
                <p>This content is visible to everyone, authenticated or not.</p>
            </div>
        </div>
    );
};














// import React, { useEffect } from "react"
// import { Link } from "react-router-dom"; // Added this import
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// export const Home = () => {
//     const { store, dispatch } = useGlobalReducer()

//     const loadMessage = async () => {
//         try {
//             const backendUrl = import.meta.env.VITE_BACKEND_URL

//             if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

//             const response = await fetch(backendUrl + "/api/hello")
//             const data = await response.json()

//             if (response.ok) dispatch({ type: "set_hello", payload: data.message })

//             return data

//         } catch (error) {
//             if (error.message) throw new Error(
//                 `Could not fetch the message from the backend.
//                 Please check if the backend is running and the backend port is public.`
//             );
//         }
//     }

//     useEffect(() => {
//         loadMessage()
//     }, [])

//     return (
//         <div className="text-center mt-5">
//             <h1 className="display-4">Hello Rigo!!</h1>
//             {/* Removed the image line since rigoImageUrl wasn't defined */}
//             <div className="alert alert-info">
//                 {store.message ? (
//                     <span>{store.message}</span>
//                 ) : (
//                     <span className="text-danger">
//                         Loading message from the backend (You are logged in)...
//                     </span>
//                 )}
//             </div>
//             <div>
//                 <Link to="/login">
//                     <button className="btn btn-primary">Logout</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };