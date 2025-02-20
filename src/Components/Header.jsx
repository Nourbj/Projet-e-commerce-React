import { useState, useEffect } from "react";
import axios from "axios";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

 
 const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState({ total: 0, count: 0 });
  const [cartId, setCartId] = useState(localStorage.getItem("cartId"));

   // Récupérer l'ID du panier au chargement initial
   useEffect(() => {
    const getCartId = async () => {
      if (!cartId) {
        try {
          const response = await axios.post("http://localhost:3000/carts", {});
          const newCartId = response.data.id;
          setCartId(newCartId);
          localStorage.setItem("cartId", newCartId);
        } catch (error) {
          console.error("Erreur lors de la création du panier : ", error);
        }
      }
    };

    getCartId();
  }, [cartId]);

   // Charger le panier à chaque modification de l'ID du panier
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

 // Fonction de recherche
 const handleSearch = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products?q=${searchQuery}`);
    setSearchResults(response.data);
  } catch (error) {
    console.error("Erreur lors de la recherche des produits : ", error);
  }
};

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
  

      <div className="col-sm-5">
        <div className="header-search" style={{ marginTop: "30px", display: 'flex' }}>
          <input
                type="text"
                placeholder="Search products..."
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginRight: '10px' }} 
              />
              <button className="btn btn-search" onClick={handleSearch}>
                Search
              </button>
          </div>
      </div>

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