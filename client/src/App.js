import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import VerifyUser from "./responses/VerifyUser";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [responses, setResponses] = useState({
    verifyUser: {},
    authorize: {},
    transfer: {},
    cancel: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/responses");
        const data = await res.json();
        setResponses(data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };
    fetchData();
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
