// app/middlewares/auth-middelwares.js
const jwt = require("jsonwebtoken");

// Middleware to check if the user is authenticated
// This middleware checks for a valid JWT token in the request headers
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};
