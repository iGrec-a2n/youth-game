import { createBrowserRouter } from "react-router-dom";
import { Notweb } from "../pages/notweb/Notweb";

const WebRouter = createBrowserRouter([
    { path: "*", element: <Notweb /> },
]);

export { WebRouter };
