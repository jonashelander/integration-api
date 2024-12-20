# Project structure(example)

project/
├── client/                # React app (frontend)
│   ├── public/            # Public assets for React
│   ├── src/               # React source files
│   │   ├── components/    # Reusable React components
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # Entry point for React app
├── server/                # Express app (backend)
│   ├── models/            # Database models (e.g., User, Response)
│   │   ├── User.js
│   │   ├── Response.js
│   ├── routes/            # Route handlers (group by feature)
│   │   ├── auth.js        # Authentication routes (e.g., login, signup)
│   │   ├── responses.js   # Response-related routes
│   │   ├── users.js       # User-related routes
│   ├── middleware/        # Middleware (e.g., JWT authentication)
│   │   ├── authenticateToken.js
│   ├── config/            # Configuration files (e.g., database connection)
│   │   ├── db.js
│   ├── server.js          # Entry point for Express backend
├── .env                   # Environment variables (e.g., secret keys, DB URL)
├── package.json           # Dependencies and scripts


-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------

# JWT Authentication Example with Express.js

This is a simple example of how to implement JSON Web Token (JWT) authentication using Express.js. It includes a login route to generate tokens and a protected route that requires a valid token to access.

## Installation

Install the required dependencies:

```bash
npm install express jsonwebtoken body-parser
```

## Code Example

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Secret key for signing tokens (use a secure key in production)
const SECRET_KEY = 'supersecretkey';


// Mock user data for demonstration (in a real app, fetch from a database)
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  password: '1234', // Plaintext for simplicity (NEVER store passwords like this!)
};

// Route to log in and get a JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simple check: match email and password with the mock user
  if (email === mockUser.email && password === mockUser.password) {
    // Create a token with user data (e.g., id and email)
    const token = jwt.sign({ id: mockUser.id, email: mockUser.email }, SECRET_KEY, { expiresIn: '1h' });

    // Send the token back to the client
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Middleware to verify the token for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach the decoded user to the request for further use
    req.user = user;
    next();
  });
};

// Protected route (only accessible with a valid token)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}. This is protected data!` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

## Explanation

### Login Route (`/login`)
- This route accepts `email` and `password` from the client.
- It checks the credentials against a mock user object (replace this with a database query in a real app).
- If the credentials match, a JWT is created and sent to the client.
- The token includes user information (`id` and `email`) and expires in 1 hour.

### Middleware (`authenticateToken`)
- This middleware checks for a token in the `Authorization` header.
- If the token is present, it verifies the token using the secret key.
- If the token is valid, the decoded user data is attached to the `req` object, and the next middleware is called.
- If the token is invalid or missing, the client receives an error response.

### Protected Route (`/protected`)
- This route requires a valid token to access.
- The middleware `authenticateToken` ensures that only authenticated users can reach this endpoint.
- The route responds with a message including the user's email address.

## Testing

1. Start the server:
   ```bash
   node server.js
   ```

2. Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the endpoints:

   - **Login:**
     ```bash
     POST http://localhost:3000/login
     Content-Type: application/json

     {
       "email": "john@example.com",
       "password": "1234"
     }
     ```

     Response:
     ```json
     {
       "token": "<JWT_TOKEN>"
     }
     ```

   - **Access Protected Route:**
     ```bash
     GET http://localhost:3000/protected
     Authorization: <JWT_TOKEN>
     ```

     Response:
     ```json
     {
       "message": "Hello, john@example.com. This is protected data!"
     }
     ```

3. If the token is missing or invalid, the protected route will return an error message.

-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------