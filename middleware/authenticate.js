const jwt = require("jsonwebtoken");

const SECRET_KEY = "supersecretkey";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing or malformed" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token", sucess: false });
    }
    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next route handler
  });
};

module.exports = authenticateToken;
