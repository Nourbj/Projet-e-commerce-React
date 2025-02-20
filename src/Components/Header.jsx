import { useState, useEffect } from "react";
import axios from "axios";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import Search from "./Search"; 

 
 const Header = () => {
  const [cart, setCart] = useState({ total: 0, count: 0 });
  const [cartId, setCartId] = useState(localStorage.getItem("cartId"));

   
   useEffect(() => {
    const fetchCart = async () => {
      if (cartId) {
        try {
          const response = await axios.get(`http://localhost:3000/carts/${cartId}`);
          setCart({
            total: response.data.totalAmount || 0,
            count: response.data.totalItems || 0,
          });
        } catch (error) {
          console.error("Erreur lors du chargement du panier : ", error);
        }
      }
    };

    fetchCart();
  }, [cartId]);

 

 return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center">
        <div className="row align-items-center">
        <div className="col-sm-8">
          <div className="logo">
            <h1>
                <img src="img/logo.png" alt="Logo" />
            </h1>
          </div>
        </div>
      </div>
  
       <Search/>

          <div className="col-sm-3">
            <div className="shopping-item">
              <a href="/cart">
                Cart: <span className="cart-amunt">{cart.total.toFixed(2)} €</span>{" "}
                <i className="fa fa-shopping-cart"></i>{" "}
                <span className="product-count">{cart.count}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;