const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginValidation = require("../validation/loginValidation");
const registerValidation = require("../validation/registerValidation");
const changeUsernameValidation = require("../validation/changeUsernameValidation");
const changePasswordValidation = require("../validation/changePasswordValidation");
const Book = require("../models/bookModel");

module.exports.register_post = async (req, res) => {
  try {
    let { email, userName, password, passwordCheck } = req.body;

    try {
      registerValidation(email, userName, password, passwordCheck);
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }

    const existingUser = await User.findOne({ email: email });
    const existingUserName = await User.findOne({ userName: userName });

    if (existingUser) {
      return res
        .status(400)
        .send({ error: "An account with this email already exists." });
    }

    if (existingUserName) {
      return res
        .status(400)
        .send({ error: "An account with this username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      userName,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      loginValidation(email, password);
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send({ error: "No account with this email has been registered." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.changeUsername_put = async (req, res) => {
  try {
    const { changeUsername, id } = req.body;
    try {
      changeUsernameValidation(changeUsername);
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }

    const existingUserName = await User.findOne({ userName: changeUsername });
    let user = await User.findOne({ _id: id });

    if (existingUserName) {
      return res
        .status(400)
        .send({ error: "An account with this username already exists." });
    }
    if (!user) {
      return res.status(400).send({ error: "Something went wrong" });
    }

    user.userName = changeUsername;
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.changePassword_put = async (req, res) => {
  try {
    const { oldPassword, newPassword, id } = req.body;
    try {
      changePasswordValidation(oldPassword, newPassword);
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }

    let user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).send({ error: "Something went wrong" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid old password." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteUser_delete = async (req, res) => {
  try {
    const delitedUsers = await User.findByIdAndDelete(req.user);

    try {
      await Book.deleteMany({ userId: req.user });
    } catch (e) {
      console.log(e);
    }

    res.json(delitedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.tokenIsValid_post = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.auth_get = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const books = await Book.find({ email: user.email });
    res.json({
      userName: user.userName,
      id: user._id,
      email: user.email,
      books,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
