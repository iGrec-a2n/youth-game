import { RouterProvider } from "react-router-dom";
import { useIsMobile } from "./hooks/useIsMobile";
import { mobileRouter, webRouter } from "./router/Router";

export const App: React.FC = () => {
  const isMobile = useIsMobile(); 

  return <RouterProvider router={isMobile ? mobileRouter : webRouter} />;
};

export default App;



