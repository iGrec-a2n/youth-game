import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Quiz } from "../pages/quiz/Quiz";
import { Notfound } from "../pages/notfound/Notfound";
import { Notweb } from "../pages/notweb/Notweb";
import { Home } from "../pages/home/Home";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Login } from "../pages/login/Login";
import { SignIn } from "../pages/SignIn/SignIn";

const mobileRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/",
    element: <Layout />,
    children: [

      { path: "SignIn", element: <SignIn /> },
      { path: "Login", element: <Login /> },
      { path: "Quiz", element: <Quiz /> },
      { path: "Dashboard", element: <Dashboard /> },
    ],
  },
  { path: "*", element: <Notfound /> },
]);



const webRouter = createBrowserRouter([
  { path: "*", element: <Notweb /> },
]);

export { mobileRouter, webRouter };


