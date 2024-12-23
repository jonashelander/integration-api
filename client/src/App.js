import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import VerifyUser from "./responses/VerifyUser";

function App() {
  const [loggedIn, setLoggedIn] = useState(true); // You might change this state as per your authentication logic
  const [responses, setResponses] = useState({
    verifyUser: {},
    authorize: {},
    transfer: {},
    cancel: {},
  });

  // Fetch data once when the component mounts
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
  }, []); // Empty dependency array means it runs only once when the component mounts

  // Handle input change for the verifyUser data
  const handleChangeInput = (field, value) => {
    setResponses((prevState) => ({
      ...prevState,
      verifyUser: {
        ...prevState.verifyUser,
        [field]: value,
      },
    }));
  };

  // ProtectedRoute logic for controlling access
  // const ProtectedRoute = ({ children }) => {
  //   if (!loggedIn) {
  //     return <Navigate to="/login" />;
  //   }
  //   return <>{children}</>;
  // };

  // Memoized ProtectedRoute to avoid re-renders
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
