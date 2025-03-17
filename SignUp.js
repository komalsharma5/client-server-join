import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/signup", user);
            alert("Signup successful!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border p-4 rounded shadow-lg w-25">
                <h2 className="text-center mb-4">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Signup</button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
