const jwt = require('jsonwebtoken');
const router = require('../routes/authRoutes');
const User = require('../models/User');

//Generate JWT Token

const generateToken = (Id) => {
    return jwt.sign({ Id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullname, email, password , profileImageUrl} = req.body;

    //Validation : Check for missing fields
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }
    try {
        //Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        //Create new user
        const user = await User.create({
            fullname,
            email,
            password,
            profileImageUrl,
        });


        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res
        .status(500)
        .json({ message: "An error occurred while registering the user." });
    }
    
};

// Login User
exports.loginUser = async (req, res) => {};

// Get User Info
exports.getUserInfo = async (req, res) => {};

modules.exports = router;


