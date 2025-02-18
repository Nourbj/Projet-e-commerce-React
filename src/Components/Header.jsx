import React from "react";
import Logo from "./logo";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

 
 const Header = () => {
  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center">
          <Logo/>

          {/* Barre de recherche */}
            <div className="col-sm-5">
            <div className="header-search" style={{ marginTop: "30px", display: 'flex' }}>
                <input
                type="text"
                placeholder="Search products..."
                className="form-control"
                style={{ marginRight: '10px' }} 
                />
                <button className="btn btn-search">Search</button>
            </div>
            </div>

          {/* Panier */}
          <div className="col-sm-3">
            <div className="shopping-item">
              <a href="/cart">
                Cart: <span className="cart-amunt">100.58 €</span>{" "}
                <i className="fa fa-shopping-cart"></i>{" "}
                <span className="product-count">5</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
 
export default Header;