const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// we are designing the way the user information will be stored on the backend

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Must be provided
    unique: true, //No duplicates // only one user can have a particular username per time --- "femi", "Femi", "FEMI"
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
