import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import VerifyUser from "./responses/VerifyUser";
import { fetchData, validateToken } from "./services/authService";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [responses, setResponses] = useState({
    verifyUser: {},
    authorize: {},
    transfer: {},
    cancel: {},
  });

  useEffect(() => {
    const validateAndFetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      try {
        // Validate the token
        const res = await validateToken(token);
        console.log(res);
        setValidToken(res.success);

        // If token is valid, fetch the data
        if (res.success) {
          const data = await fetchData(token);
          setResponses(data);
        }
      } catch (err) {
        console.error(
          "Error during token validation or data fetching:",
          err.message
        );
      }
    };

    // Call the async function inside useEffect
    if (loggedIn) {
      validateAndFetchData();
    }
  }, [loggedIn]);

  const handleChangeInput = (field, value) => {
    setResponses((prevState) => ({
      ...prevState,
      verifyUser: {
        ...prevState.verifyUser,
        [field]: value,
      },
    }));
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Logged in successfully:", data);

      // Save the token (or any other data) to localStorage or state
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute loggedIn={loggedIn} validToken={validToken}>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn} validToken={validToken}>
                <VerifyUser
                  verifyUser={responses.verifyUser}
                  onInputChange={handleChangeInput}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
