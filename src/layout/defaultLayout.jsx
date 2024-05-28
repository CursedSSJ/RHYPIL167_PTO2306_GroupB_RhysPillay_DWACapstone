import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import LayoutContent from "./components/layoutContent";

const DefaultLayout = () => {
  let { state } = useLocation();

  return (
    <>{state?.token ? <LayoutContent /> : <Navigate to="/auth/login" />}</>
  );
};

export default DefaultLayout;
