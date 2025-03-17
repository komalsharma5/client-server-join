const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require("cors");
const userRoutes = require('./Routes/userRoutes');
const cookieParser = require("cookie-parser");





app.use(cors());
app.use(express.json());  // Middleware to parse JSON request body
app.use(cookieParser());
app.use('/api', userRoutes); // Prefix your routes with /api


// Connect to MongoDB database
mongoose.connect("mongodb+srv://sharmakomalweb:3qvcLD00F3ps0Zo0@cluster0.1darij1.mongodb.net/client-server")
    .then((data)=>{
    if(data){
        console.log("connected to database")
    }}).catch((error)=>{
    console.log(error)
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);



