import React from "react";
import AuthLayout from "../layout/authLayout";
import Login from "../feature/auth/login";
import SignUp from "../feature/auth/signUp";

import FavoriteEpisodes from "../feature/content/components/favouritesCard";

import Error404 from "../feature/core/error404";

const publicRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "*", element: <Error404 /> },
    ],
  },
  {
    path: "content/favourites?${userIdParam}",
    element: <FavoriteEpisodes />,
  },
];

export default publicRoutes;
