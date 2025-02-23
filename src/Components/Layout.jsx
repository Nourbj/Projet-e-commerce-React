import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import  Navbar  from "./Navbar";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      
      {location.pathname !== "/checkout" && location.pathname !== "/cart" && <Navbar />}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
