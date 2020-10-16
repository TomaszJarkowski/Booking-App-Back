const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  dateDay: { type: String, required: true },
  dateMonth: { type: String, required: true },
  dateYear: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  hour: { type: String, required: true },
  numberOfSeats: { type: String, required: true },
});

module.exports = Book = mongoose.model("book", bookSchema);
