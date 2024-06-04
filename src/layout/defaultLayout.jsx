import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const { state } = useLocation();

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    // Optional: You may want to log the location state for debugging
    console.log("Location state:", state);
  }, [state]);

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default DefaultLayout;
