import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { Footer } from "../footer/Footer";
import './Layout.scss'

const Layout = () => {


    return (

    <div className="view">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
  </div>

        
            
            
        
    );
};

export default Layout;