import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function CartComponent() {
  const [cart, setCart] = useState({
    total: 0,
    count: 0,
    subTotal: 0,
    tax: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartData = localStorage.getItem("cart"); 

    if (cartData) {
      const parsedCart = JSON.parse(cartData); 
      setCart({
        total: parsedCart.total || 0,         
        count: parsedCart.items?.length || 0,  
        subTotal: parsedCart.subTotal || 0,    
        tax: parsedCart.tax || 0,              
      });
    }

    setLoading(false); 
  }, []); 

  return (
    <div className="col-sm-3 d-flex justify-content-end">
  <div className="col-sm-0 d-flex justify-content-end">
    <div className="shopping-item">
      <Link to="/cart">
        Cart:{" "}
        <span className="cart-amunt">
          {loading ? "Loading..." : cart.subTotal.toFixed(2)} €
        </span>{" "}
        <i className="fa fa-shopping-cart"></i>{" "}
        <span className="product-count">
          {loading ? "..." : cart.count}
        </span>
      </Link>
    </div>
  </div>
</div>

  );
}

export default CartComponent;
