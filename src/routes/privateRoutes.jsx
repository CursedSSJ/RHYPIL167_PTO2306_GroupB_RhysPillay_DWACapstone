import DefaultLayout from "../layout/defaultLayout";
import LayoutContent from "../layout/components/layoutContent";
import Content from "../feature/content/content";
import MainCard from "../feature/content/components/mainCard";
import Error404 from "../feature/core/error404";

const privateRoutes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "content",
        element: <LayoutContent />,
        children: [
          { path: "", element: <Content /> },
          { path: "mainCard/:id", element: <MainCard /> },
        ],
      },
      { path: "*", element: <Error404 /> },
    ],
  },
];

export default privateRoutes;
