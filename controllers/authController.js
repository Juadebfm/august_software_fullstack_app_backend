const User = require("../models/User"); // Bring in the user
const jwt = require("jsonwebtoken"); // for authenticating users
const bcrypt = require("bcryptjs");

// Request is coming from the frontend
// Response is the react of the backend to the request

// Operations to : Signup A User
const signup = async (req, res) => {
  try {
    // Get the data from the request body (coming from the frontend reference the test.js file explantion)
    const { username, password, phone, email } = req.body;

    // check if username, phone, email already exist. i.e if we already have a user with this information
    const existingUser = await User.findOne({
      $or: [{ username }, { phone }, { email }], //queries the database and sort through the data inside the database for that value
    });

    if (existingUser) {
      return res.status(400).json({ message: "Credentials already exists" });
    }

    // create new user
    const newUser = new User({ username, password, phone, email });
    await newUser.save(); // the user's information is saved to the database "_id"

    // Generate a token to authenticate the user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User Created Successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({ message: "Error signing up users" });
  }
};

const signin = async (req, res) => {
  try {
    // Get the data from the request body (coming from the frontend reference the test.js file explantion)
    const { username, password } = req.body;

    // Get token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authentication token is required" });
    }

    const token = authHeader.split(" ")[1]; // Bearer dsjsnihjbnasicbiasjdcijasbjcsbsajbcj

    // Verify token when we've been able to extract it from  the authHeader
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Validate that the user token's userid maches the user trying to login/
    const user = await User.findById(decodedToken.userId);
    if (!user || user.username !== username) {
      return res.status(401).json({ message: "Invalid token or username" });
    }

    //check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Passwords" });
    }

    //if success
    res.json({
      message: "Login Successfully",
      user: {
        id: user._id,
        username: user.username,
        username: user.username,
        phone: user.phone,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log("Signin Error:", error);
    res.status(500).json({ message: "Error signing in users" });
  }
};

module.exports = { signup, signin };
