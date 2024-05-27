import React from "react";
import AuthLayout from "../layout/authLayout";
import Login from "../feature/auth/login";
import ForgotPassword from "../feature/auth/forgotPassword";
import ChangePassword from "../feature/auth/changePassword";
import Code from "../feature/auth/code";
import Logout from "../feature/auth/logout";

import Error404 from "../feature/core/error404";

const publicRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "changePassword", element: <ChangePassword /> },
      { path: "code", element: <Code /> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <Error404 /> },
    ],
  },
];

export default publicRoutes;
