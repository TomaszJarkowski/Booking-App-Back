const validator = require("validator");
const User = require("../models/userModel");

const minLenghtPassword = {
  min: 7,
};

const registerValidation = async (email, password, passwordCheck) => {
  if (!email || !password || !passwordCheck) {
    throw new Error("Not all fields have been entered.");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not correct");
  }

  if (!validator.isAlphanumeric(password)) {
    throw new Error("The password must contain only numbers and letters");
  }
  if (!validator.isLength(password, minLenghtPassword)) {
    throw new Error("The minimum password length is: 7");
  }

  if (password != passwordCheck) {
    throw new Error("Enter the same password twice for verification.");
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }
};

module.exports = registerValidation;
