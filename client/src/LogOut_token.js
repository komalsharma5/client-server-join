import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogOut_token = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/logout", { withCredentials: true })
            .then((response) => {
                if (response.data.success) {
                    localStorage.removeItem("token"); // Remove token from localStorage
                    navigate("/login"); // Redirect to login page
                }
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    }, [navigate]);

    return <h2>Logging out...</h2>;
};

export default LogOut_token;
