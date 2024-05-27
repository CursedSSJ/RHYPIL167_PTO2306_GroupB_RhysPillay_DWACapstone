import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import colors from "./theme/colors";
import CssBaseline from "@mui/material/CssBaseline";

import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes"; // Import the function

const App = () => {
  const privateRouteList = privateRoutes();

  const router = createBrowserRouter([...privateRouteList, ...publicRoutes]);

  return (
    <ThemeProvider theme={colors}>
      <CssBaseline />
      <RouterProvider router={router} themeName={colors} />
    </ThemeProvider>
  );
};

export default App;
