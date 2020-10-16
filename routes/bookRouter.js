const router = require("express").Router();
const bookController = require("../controllers/bookController");

router.post("/get", bookController.book_get);
router.post("/", bookController.book_post);
router.delete("/", bookController.book_delete);

module.exports = router;
