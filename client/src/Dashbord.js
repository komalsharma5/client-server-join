import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashbord = () => {
    const navigate = useNavigate();

    //cookies in application browser logout code
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check authentication status
                const response = await axios.get("http://localhost:5000/api/check-auth", { withCredentials: true });

                if (!response.data.success) {
                    navigate("/login"); // Redirect if authentication fails
                }
            } catch (error) {
                navigate("/login"); // Redirect if error (token missing)
            }
        };

        checkAuth(); // Run on page load

        // Periodically check every 3 seconds
        const interval = setInterval(checkAuth, 3000);

        return () => clearInterval(interval); // Cleanup interval
    }, [navigate]);



    //button logout code
    const handleLogout = () => {
        axios.get("http://localhost:5000/api/logout", { withCredentials: true })
            .then(() => {
                localStorage.removeItem("token");
                navigate("/login");
            })
            .catch((error) => console.error("Logout error:", error));
    };
 
    return <>
    <h2>Wlcome to dashbord</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
};

export default Dashbord;
