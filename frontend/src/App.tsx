import { RouterProvider } from "react-router-dom";
import { useIsMobile } from "./hooks/useIsMobile";
import { mobileRouter } from "./router/MobileRouter";
import { WebRouter } from "./router/WebRouter";
import { UserProvider } from "./utils/context/UserContext";
export const App: React.FC = () => {
  const isMobile = useIsMobile();
  console.log("isMobile =", isMobile);
  return (
    <UserProvider>
      <RouterProvider router={isMobile ? mobileRouter : WebRouter} />
    </UserProvider>
  );
};

export default App;




