const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentucatuin token, autorization denied." });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification field, autorization denied." });
    }

    req.user = verified.id;
    next();
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = authMiddleware;
