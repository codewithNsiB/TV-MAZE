import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Component/Root";
import Home from "../Pages/Home";
import TvDetail from "../Pages/TvDetail";
import Search from "../Pages/Search";
import Tvshows from "../Pages/Tvshows";
import Error from "../Component/Error";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "tvshows/:id",
          element: <TvDetail />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/tvshows",
          element: <Tvshows />,
        },
        //either write as this or the above
        //  {
        //   path: '*',
        //   element:<Error />,
        // }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
