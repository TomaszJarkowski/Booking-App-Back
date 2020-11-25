const validator = require("validator");

const minUserName = {
  min: 4,
};

const changeUsernameValidation = (changeUsername) => {
  if (!changeUsername) {
    throw new Error("Not all fields have been entered.");
  }
  if (!validator.isLength(changeUsername, minUserName)) {
    throw new Error("The minimum username length is: 4");
  }
  if (!validator.isAlphanumeric(changeUsername, "pl-PL")) {
    throw new Error("The username must contain only numbers and letters");
  }
  if (changeUsername.lenght > 16) {
    throw new Error("The maximum username length is: 16");
  }
};

module.exports = changeUsernameValidation;
