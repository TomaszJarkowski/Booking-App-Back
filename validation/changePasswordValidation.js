const validator = require("validator");

const minLenghtPassword = {
  min: 7,
};

const changePasswordValidation = (oldPassword, newPassword) => {
  if (!oldPassword || !newPassword) {
    throw new Error("Not all fields have been entered.");
  }
  if (!validator.isAlphanumeric(oldPassword)) {
    throw new Error("The old password must contain only numbers and letters");
  }
  if (!validator.isLength(oldPassword, minLenghtPassword)) {
    throw new Error("The minimum old password length is: 7");
  }
  if (!validator.isAlphanumeric(newPassword)) {
    throw new Error("The new password must contain only numbers and letters");
  }
  if (!validator.isLength(newPassword, minLenghtPassword)) {
    throw new Error("The minimum new password length is: 7");
  }
};

module.exports = changePasswordValidation;
