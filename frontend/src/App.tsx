import { RouterProvider } from "react-router-dom";
import { useIsMobile } from "./hooks/useIsMobile";
import { mobileRouter } from "./router/MobileRouter";
import { WebRouter } from "./router/WebRouter";
export const App: React.FC = () => {
  const isMobile = useIsMobile();
  console.log("isMobile =", isMobile);
  return <RouterProvider router={isMobile ? mobileRouter : WebRouter} />;
};

export default App;




