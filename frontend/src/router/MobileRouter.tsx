import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Quiz } from "../pages/quiz/Quiz";
import { Notfound } from "../pages/notfound/Notfound";
import { Notweb } from "../pages/notweb/Notweb";
import { Home } from "../pages/home/Home";

const mobileRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />


  },

  {
    path: "/Quiz",
    element: <Layout />,
    children: [
      { index: true, element: <Quiz /> },
    ],
  },
  { path: "*", element: <Notfound /> },
]);


const webRouter = createBrowserRouter([
  { path: "*", element: <Notweb /> },
]);

export { mobileRouter, webRouter };


