const User = require("../models/User"); // Bring in the user
const jwt = require("jsonwebtoken"); // for authenticating users
const bcrypt = require("bcryptjs");

// Request is coming from the frontend
// Response is the react of the backend to the request

// Operations to : Signup A User
const signup = async (req, res) => {
  try {
    // Get the data from the request body (coming from the frontend)
    const { username, password, phone, email } = req.body;

    // check if username, phone, email already exist. i.e if we already have a user with this information
    const existingUser = await User.findOne({
      $or: [{ username }, { phone }, { email }], //queries the database and sort through the data inside the database for that value
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });
      }
      if (existingUser.phone === phone) {
        return res
          .status(400)
          .json({ success: false, message: "Phone Number already exists" });
      }
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }
    }

    // create new user
    const newUser = new User({ username, password, phone, email });
    await newUser.save(); // the user's information is saved to the database "_id"

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        id: newUser._id,
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
    // Get the data from the request body (coming from the frontend)
    const { username, password } = req.body;

    // find the user by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username Or Password" });
    }

    // check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username Or Password" });
    }

    //generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // return success response
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Signin Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { signup, signin };
