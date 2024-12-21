const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 4000;

app.use(bodyParser.json);

const SECRET_KEY = "supersecretkey";

const mockUser = {
  id: 1,
  username: "user",
  password: "pass",
};

const login = (req, res) => {
  const { username, password } = req.body;
  console.log(req.authorization);

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign(
      { id: mockUser.id, username: mockUser.username },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = { login };
