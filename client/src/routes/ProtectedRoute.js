import { useMemo } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, validToken, children }) => {
  // Authenticate user request to check if token is valid??
  //   const validToken = false;
  const MemorizedProtectedRoute = useMemo(() => {
    if (!loggedIn || !validToken) {
      return <Navigate to={"/login"} replace />;
    } else if (!validToken) {
    }
    return children;
  }, [loggedIn, children]);

  return MemorizedProtectedRoute;
};

export default ProtectedRoute;
