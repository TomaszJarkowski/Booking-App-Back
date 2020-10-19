const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.post("/register", authController.register_post);
router.post("/login", authController.login_post);
router.post("/tokenIsValid", authController.tokenIsValid_post);
router.put("/changeUsername", authController.changeUsername_put);
router.put("/changePassword", authController.changePassword_put);
router.get("/", authMiddleware, authController.auth_get);
router.delete("/deleteUser", authMiddleware, authController.deleteUser_delete);

module.exports = router;
