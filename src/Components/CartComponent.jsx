import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 
function CartComponent() {
  const navigate = useNavigate();
  const { total, items } = useSelector((state) => state.cart);
 
  const totalProducts = items.reduce((sum, item) => sum + item.qty, 0);
 
  const handleCartClick = () => {
    navigate("/cart");
  };
 
  return (
    <div className="col-sm-3">
      <div className="shopping-item" style={{ cursor: "pointer" }} onClick={handleCartClick}>
        Cart : <span className="cart-amunt">{total.toFixed(2)} €</span>{" "}
        <i className="fa fa-shopping-cart"></i>{" "}
        <span className="product-count">{totalProducts}</span>
      </div>
    </div>
  );
}
 
export default CartComponent;
 