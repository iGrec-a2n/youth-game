import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Quiz from "../pages/quiz/Quiz";
import { Notfound } from "../pages/notfound/Notfound";
import { Notweb } from "../pages/notweb/Notweb";
import { Home } from "../pages/home/Home";
import Admin from "../pages/admin/Admin";
import Signin from "../pages/signin/Signin";
import Signup from "../pages/signup/Signup";
import JoinRoom from "../components/join/join";

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
  { path:"/Admin", element: <Admin />},
  { path:"/Signin", element: <Signin />},
  { path:"/Signup", element: <Signup />},
  { path:"/join", element: <JoinRoom />},
  { path: "*", element: <Notfound /> },
]);


const webRouter = createBrowserRouter([
  { path: "*", element: <Notweb /> },
]);

export { mobileRouter, webRouter };


