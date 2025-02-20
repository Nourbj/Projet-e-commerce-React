import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      {location.pathname !== "/Checkout" && location.pathname !== "/cart" && <Navbar />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
