const validator = require("validator");

const minLenght = {
  min: 3,
};

const bookValidation = (
  email,
  dateDay,
  dateMonth,
  dateYear,
  firstName,
  lastName,
  numberOfSeats,
  hour
) => {
  if (
    !email ||
    !firstName ||
    !lastName ||
    !numberOfSeats ||
    !hour ||
    !dateDay ||
    !dateMonth ||
    !dateYear
  ) {
    throw new Error("Not all fields have been entered.");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not correct");
  }
  if (!validator.isAlphanumeric(firstName, "pl-PL")) {
    throw new Error("The first name must contain only numbers and letters");
  }
  if (!validator.isAlphanumeric(lastName, "pl-PL")) {
    throw new Error("The last name must contain only numbers and letters");
  }

  if (!validator.isLength(firstName, minLenght)) {
    throw new Error("The minimum first name length is: 3");
  }
  if (!validator.isLength(lastName, minLenght)) {
    throw new Error("The minimum last name length is: 3");
  }
  if (dateMonth.length !== 3) {
    throw new Error("Incorect date month");
  }
  if (!validator.isInt(dateDay)) {
    throw new Error("Incorect date day");
  }
  if (!validator.isInt(dateYear)) {
    throw new Error("Incorect date year");
  }
  if (firstName.lenght > 16) {
    throw new Error("The maximum name length is: 16");
  }
  if (lastName.lenght > 16) {
    throw new Error("The maximum last name length is: 16");
  }
};

module.exports = bookValidation;
