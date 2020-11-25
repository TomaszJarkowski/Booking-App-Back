const validator = require("validator");

const minLenghtPassword = {
  min: 7,
};
const minUserName = {
  min: 4,
};

const registerValidation = (email, userName, password, passwordCheck) => {
  if (!email || !userName || !password || !passwordCheck) {
    throw new Error("Not all fields have been entered.");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not correct");
  }
  if (!validator.isLength(userName, minUserName)) {
    throw new Error("The minimum username length is: 4");
  }
  if (!validator.isAlphanumeric(userName, "pl-PL")) {
    throw new Error("The username must contain only numbers and letters");
  }
  if (!validator.isAlphanumeric(password)) {
    throw new Error("The password must contain only numbers and letters");
  }
  if (!validator.isLength(password, minLenghtPassword)) {
    throw new Error("The minimum password length is: 7");
  }
  if (password.lenght > 16) {
    throw new Error("The maximum password length is: 16");
  }
  if (userName.lenght > 16) {
    throw new Error("The maximum username length is: 16");
  }
  if (password != passwordCheck) {
    throw new Error("Enter the same password twice for verification.");
  }
};

module.exports = registerValidation;
