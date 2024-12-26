import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import VerifyUser from "./responses/VerifyUser";
import { fetchData } from "./services/authService";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [responses, setResponses] = useState({
    verifyUser: {},
    authorize: {},
    transfer: {},
    cancel: {},
  });

  useEffect(() => {
    if (loggedIn) {
        fetchData(localStorage.getItem("token")).then((res) => {
          setResponses(res);
        });
    }
  }, []);

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

  const ProtectedRoute = useMemo(
    () =>
      function ProtectedRoute({ children }) {
        if (!loggedIn) {
          return <Navigate to="/login" />;
        }
        return children;
      },
    [loggedIn]
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
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
