import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./SignUp";
import Login from "./Login";
import Dashboard from "./Dashbord";
import LogOut_token from "./LogOut_token";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/logout" element={<LogOut_token />} />
                
            </Routes>
        </Router>
    );
}

export default App;

