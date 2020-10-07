const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
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
});

module.exports = router;
