import { useMemo } from "react";
import { Navigate } from "react-router-dom";

const valitToken = true;

const GuestRoute = ({ loggedIn, validToken, children }) => {
  if (loggedIn && validToken) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default GuestRoute;
