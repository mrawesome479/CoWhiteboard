const Roles = require("../constants/Roles");
const User = require("../models/userModel");
const { createSecretToken } = require("../utils/jwtUtils")
const bcrypt = require("bcrypt");

module.exports.SignUp = async (req, res, next) => {
    try {
      const { email, password, firstName, lastName, username, role, createdAt } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }

      if(!role || (role && !(role.toUpperCase() in Roles))){
        console.log(`passed role : ${role}`);
        return res.json({ message: "invalid role is passed, plz provide valid role"})
      }

      const user = await User.create({ email, password, firstName, role: role.toUpperCase(), lastName, username, createdAt });
      const token = createSecretToken(user._id);
      console.log(`generated token: ${token}`);
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      console.error(error);
    }
};

module.exports.SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({message: 'please provide all required fields', success: false})
        }
        
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message:'Incorrect password or email', success: false }) 
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.status(400).json({message:'Incorrect password or email', success: false }) 
        }
        const token = createSecretToken(user._id);
        res.status(201).json({ message: "User logged in successfully", success: true, token, userId: user._id, fullname: user.firstName+' '+user.lastName });
        next()
    } catch (error) {
        console.error(error);
    }
}