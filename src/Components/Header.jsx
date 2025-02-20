import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import pour récupérer la route actuelle
import axios from "axios";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import Search from "./Search"; 
import Cart from '../Pages/Cart'; 


const Header = () => {
  const [cart, setCart] = useState({ total: 0, count: 0 });
  const [cartId, setCartId] = useState(localStorage.getItem("cartId"));
  const location = useLocation(); 

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
        {/* Utilisation de Flexbox pour aligner les éléments horizontalement */}
        <div className="row align-items-center d-flex justify-content-between">
          
          {/* Logo */}
          <div className="col-sm-3 d-flex align-items-center">
            <div className="logo">
              <h1>
                <img src="img/logo.png" alt="Logo" className="img-fluid" />
              </h1>
            </div>
          </div>

          {/* Searchbar (affiché sauf sur Checkout) */}
          <div className="col-sm-6 d-flex justify-content-center">
          {location.pathname !== "/Checkout" && location.pathname !== "/cart" && <Search />}
            
          </div>

          {/* Panier (Cart) */}
          <div className="col-sm-3 d-flex justify-content-end">
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
