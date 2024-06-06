import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const isAuthenticated = localStorage.getItem("authToken") ? true : false;

  useEffect(() => {
    console.log("Location state:", isAuthenticated);
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default DefaultLayout;
