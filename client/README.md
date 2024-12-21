Certainly! Here's an example where all the endpoints, authentication, and middleware are managed in `server.js`, while still keeping things modular for scalability.

---

### **File Structure**

```plaintext
.
├── server.js              # Main file with endpoints and middleware
├── controllers
│   └── authController.js  # Handles login logic
├── middleware
│   └── authenticate.js    # Middleware for verifying tokens
└── package.json
```

---

### **1. `authController.js`** (Handles Login)

```javascript
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const SECRET_KEY = "your_secret_key_here"; // Secret key for signing tokens

const login = (req, res) => {
  const { username, password } = req.body;

  // Mock user data
  const mockUser = {
    id: 1,
    username: "user",
    password: "pass",
  };

  // Validate user credentials
  if (username === mockUser.username && password === mockUser.password) {
    const userId = uuidv4(); // Generate a UUID for this session

    // Sign the token
    const token = jwt.sign(
      { id: userId, username: mockUser.username },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    res.json({ token }); // Send the token to the client
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = { login, SECRET_KEY };
```

---

### **2. `authenticate.js`** (Middleware for Token Verification)

```javascript
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../controllers/authController"); // Use the same secret key

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Extract token from headers

  if (!token) {
    return res.status(401).json({ message: "No token provided" }); // If no token, deny access
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" }); // If token is invalid, deny access
    }

    req.user = decoded; // Attach decoded token data to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
```

---

### **3. `server.js`** (Endpoints and Middleware)

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { login } = require("./controllers/authController"); // Login logic
const authenticateToken = require("./middleware/authenticate"); // Token verification middleware

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON body
app.use(cors()); // Enable CORS for all routes

// Public routes
app.post("/login", login); // Login endpoint (no token required)

// Protected routes
app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to the protected route!",
    user: req.user, // Contains decoded user data from the token
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### **How It Works**

#### **Login Endpoint**

1. **Route**: `/login`  
   **Method**: `POST`
   - Receives `username` and `password` in the request body.
   - If the credentials are valid, generates a JWT token and sends it back to the client.
   - Token is signed with the `SECRET_KEY` and contains a payload (e.g., user ID and username).

#### **Protected Endpoint**

2. **Route**: `/protected`  
   **Method**: `GET`
   - Requires a valid token in the `Authorization` header.
   - Uses `authenticateToken` middleware to verify the token.
   - If the token is valid, allows access and sends back decoded user info.

---

### **Example Requests**

#### 1. Login

```http
POST /login
Content-Type: application/json

{
  "username": "user",
  "password": "pass"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 2. Access Protected Route

```http
GET /protected
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "message": "Welcome to the protected route!",
  "user": {
    "id": "generated-uuid",
    "username": "user",
    "iat": 1700000000,
    "exp": 1700003600
  }
}
```

---

### **Advantages of This Setup**

- **Single Point of Entry**: All endpoints are in `server.js` for simplicity.
- **Modular Logic**: Login and authentication logic are kept in their respective files for clarity and maintainability.
- **Reusability**: `authenticateToken` middleware can be used across multiple protected routes.

---

Let me know if this structure fits your needs or if you need further adjustments! 😊
