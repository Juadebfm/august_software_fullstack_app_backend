const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// we are designing the way the user information will be stored on the backend

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Must be provided
    unique: true, //No duplicates
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10,15}$/, "Phone number must be 10 to 15 digits"], //optional
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email must be valid with proper email format"],
  },
});

// Encrypt the password before
userSchema.pre("save", async function (next) {
  //only encrpyt if the password is being modified.
  if (!this.isModified("password")) return next();

  // encrypt the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//create model
const User = mongoose.model("User", userSchema);

module.exports = User;
