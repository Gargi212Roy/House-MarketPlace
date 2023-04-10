import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    // it'll check if we are logged in when it's loading or checkingh status it'll display the following below else it'll redirect if we are not logged in or the Outlet ---> nested route
    // return <h3>Loading...</h3>;
    return <Spinner />;
  }
  // Outlet is used to return Child Elements
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
