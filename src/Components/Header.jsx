import { useLocation } from "react-router-dom"; 
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import Search from "./Search"; 
import CartComponent from "./CartComponent";

const Header = () => {
  const location = useLocation(); 

  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center d-flex justify-content-between">
          <div className="col-sm-3 d-flex align-items-center">
            <div className="logo">
              <h1>
                <img src="/img/logo.png" alt="Logo" className="img-fluid" />
              </h1>
            </div>
          </div>
          <div className="col-sm-6 d-flex justify-content-center">
            {/* {location.pathname !== "/checkout" && location.pathname !== "/cart" && <Search />} */}
          </div>
            <CartComponent />
          </div>
        </div>
    </header>
  );
};

export default Header;