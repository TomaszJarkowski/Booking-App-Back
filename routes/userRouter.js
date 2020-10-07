const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("Hello, world!");
});

module.exports = router;
