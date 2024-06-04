import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import colors from "./theme/colors";
import CssBaseline from "@mui/material/CssBaseline";

import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";

const App = () => {
  const router = createBrowserRouter([...privateRoutes, ...publicRoutes]);

  return (
    <ThemeProvider theme={colors}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
