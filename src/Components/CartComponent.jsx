import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import axios from "axios"; 

function CartComponent() {
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
    <div className="col-sm-3 d-flex justify-content-end">

    <div className="col-sm-0 d-flex justify-content-end">
            <div className="shopping-item">
              <a href="/cart">
                Cart: <span className="cart-amunt">{cart.total.toFixed(2)} €</span>{" "}
                <i className="fa fa-shopping-cart"></i>{" "}
                <span className="product-count">{cart.count}</span>
              </a>
            </div>
          </div>
          </div>

  );
}

export default CartComponent;
