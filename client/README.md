```javascript
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, check if token is valid (e.g., decode or call backend)
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      setUser({ username });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

const LandingPage = () => <h1>Welcome to the app!</h1>;
const ProtectedPage = () => <h1>This is a protected page!</h1>;

export default App;
```

### Key Points in the Update:

- The route `path="/"` (and any other route you want to protect) is now correctly wrapped with the `ProtectedRoute` component.
- The `ProtectedRoute` component will check if the user is logged in (by checking if the token is in `localStorage`).
- If the user is not logged in, they will be redirected to the login page.

### Flow:

- **Public routes** like `/login` are accessible without authentication.
- **Protected routes** like `/` and `/protected` require the user to be logged in (i.e., having a valid token in `localStorage`).

This ensures that only authenticated users can access the protected pages.
