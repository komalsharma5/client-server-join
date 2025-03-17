const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const register_user = async(req, res) => {
    const {name,email,password} = req.body;
    try {
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashPassword
        });
        await newUser.save();
        res.status(200).json({
            success : true,
            message : "user created successfully",
            data : newUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "server error"
        })
    }

}

const login_User = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const checkUser = await User.findOne({email:email});
        if(!checkUser){
            return res.status(400).send("User not found");
        }
        const validPassword = bcrypt.compare(password,checkUser.password);
        if(!validPassword){
            return res.status(400).send("Invalid password");
        }

       
      const token = jwt.sign(
        {
          id: checkUser._id,
          role: checkUser.role,
          email: checkUser.email,
          userName: checkUser.userName,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "24h" }
      );
  
      res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          id: checkUser._id,
          userName: checkUser.userName,
        },
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "server error"
        })
    }
}

//auth middlewere
const authMiddlewere = async(req, res, next) =>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            success : false,
            message : "UnAuthorized User"
        })
    }
    try {
        const decode = jwt.verify(token, 'CLIENT_SECRET_KEY')  
        req.user = decode 
        next()
    } catch (error) {
        res.status(401).json({
            success : false,
            message : "Invalid token"
        })
    }
}

module.exports = {
    register_user,
    login_User,
    authMiddlewere
}