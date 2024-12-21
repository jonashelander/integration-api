const express = require("express");
const bodyParser = require("body-parser");
const responses = require("./data/responses.json"); // Load responses from JSON file
const cors = require("cors");

const { login } = require("./controllers/authController");
const authenticateToken = require("./middleware/authenticate");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

/* const corsOptions = {
  origin: "*", // This allows requests from any domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies (if required)
};
app.use(cors(corsOptions)); */

// Middleware
app.use(bodyParser.json()); // Parse JSON body
app.use(cors()); // Enable CORS for all routes

// Define endpoints
app.post("/login", login);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

app.post("/api/verifyUser", (req, res) => {
  console.log(req);
  res.set("Content-Type", "application/json; charset=utf-8");
  res.json(responses.verifyUser);
});

app.post("/api/authorize", (req, res) => {
  res.json(responses.authorize);
});

app.get("/api/transfer", (req, res) => {
  res.json(responses.transfer);
});

app.get("/api/cancel", (req, res) => {
  res.json(responses.cancel);
});

app.get("/api/signIn", (req, res) => {
  res.json(responses.signIn);
});

app.get("/api/responses", (req, res) => {
  res.json(responses);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
