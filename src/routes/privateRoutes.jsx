import React from "react";
import DefaultLayout from "../layout/defaultLayout";
import Content from "../feature/content/content";
// import Users from "../feature/users/users";
// import User from "../feature/users/user";
// import Profile from "../feature/profile/profile";
// import Accounts from "../feature/accounts/accounts";
// import Account from "../feature/accounts/account";
// import Dividends from "../feature/dividends/dividends";
// import Dividend from "../feature/dividends/dividend";
// import Data from "../feature/data/data";

import Error404 from "../feature/core/error404";

const privateRoutes = () => {
  return [
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { path: "", element: <Content /> },
        { path: "content", element: <Content /> },
        // { path: "users", element: <Users /> },
        // { path: "user/:id", element: <User /> },
        // { path: "profile", element: <Profile /> },
        // { path: "data", element: <Data /> },
        // { path: "accounts", element: <Accounts /> },
        // { path: "account/:id", element: <Account /> },
        // { path: "dividends", element: <Dividends /> },
        // { path: "dividend/:id", element: <Dividend /> },
        { path: "*", element: <Error404 /> },
      ],
    },
  ];
};

export default privateRoutes;
