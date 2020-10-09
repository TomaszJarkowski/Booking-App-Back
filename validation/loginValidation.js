const validator = require("validator");

const minLenghtPassword = {
  min: 7,
};

const loginValidation = (email, password) => {
  if (!validator.isEmail(email)) {
    throw new Error("Email is not correct");
  }
  if (!validator.isAlphanumeric(password)) {
    throw new Error("The password must contain only numbers and letters");
  }
  if (!validator.isLength(password, minLenghtPassword)) {
    throw new Error("The minimum password length is: 7");
  }
};

module.exports = loginValidation;
