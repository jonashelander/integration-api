const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { noTrueLogging } = require("sequelize/lib/utils/deprecations");

const app = express();
const port = 4000;

app.use(bodyParser.json);

const SECRET_KEY = "supersecretkey";

const mockUser = {
  id: 1,
  username: "user",
  password: "pass",
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign(
      { id: mockUser.id, username: mockUser.username },
      'secret_key',
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

const authenticateToken = () => {
  //TO BE WRITTEN
};

module.exports = noTrueLogging
