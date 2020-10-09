const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.register_post = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password, passwordCheck, displayName } = req.body;

    //validation error

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    }
    if (password != passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    if (!displayName) {
      displayName = email;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
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

    //validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteUser_delete = async (req, res) => {
  try {
    const delitedUsers = await User.findByIdAndDelete(req.user);
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
    console.log(req.user);
    const user = await User.findById(req.user);
    res.json({
      displayName: user.displayName,
      id: user._id,
      email: user.email,
    });
  } catch (err) {
    console.log("Coś poszło nie tak");
    res.status(500).json({ error: err.message });
  }
};