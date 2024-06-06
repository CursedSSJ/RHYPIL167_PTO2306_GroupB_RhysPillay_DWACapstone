import React from "react";
import AuthLayout from "../layout/authLayout";
import Login from "../feature/auth/login";
import SignUp from "../feature/auth/signUp";
import Logout from "../feature/auth/logout";

import Error404 from "../feature/core/error404";

const publicRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Error404 /> },
    ],
  },
];

export default publicRoutes;
