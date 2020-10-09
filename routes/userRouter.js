const router = require("express").Router();
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

const authController = require("../controllers/authController");

router.post("/register", authController.register_post);
router.post("/login", authController.login_post);
router.post("/tokenIsValid", authController.tokenIsValid_post);
router.get("/", authMiddleware, authController.auth_get);
router.delete("/deleteUser", authMiddleware, authController.deleteUser_delete);

module.exports = router;
