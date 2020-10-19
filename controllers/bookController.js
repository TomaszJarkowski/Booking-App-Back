const bookValidation = require("../validation/bookValidation");
const Book = require("../models/bookModel");

module.exports.book_post = async (req, res) => {
  try {
    const {
      userId,
      email,
      dateDay,
      dateMonth,
      dateYear,
      firstName,
      lastName,
      numberOfSeats,
      hour,
    } = req.body;
    try {
      bookValidation(
        email,
        dateDay,
        dateMonth,
        dateYear,
        firstName,
        lastName,
        numberOfSeats,
        hour
      );
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }

    const newBook = new Book({
      userId,
      email,
      dateDay,
      dateMonth,
      dateYear,
      firstName,
      lastName,
      numberOfSeats,
      hour,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.book_get = async (req, res) => {
  try {
    const userId = req.body.userId;
    const books = await Book.find({ userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.book_delete = async (req, res) => {
  try {
    const bookToDelete = req.body.id;
    const delitedBook = await Book.findByIdAndDelete(bookToDelete);
    res.json(delitedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
