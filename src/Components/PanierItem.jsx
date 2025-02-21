import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeItemFromCart } from "../Redux/CartSlice";  

const PanierItem = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);  

  const handleUpdateQuantity = (id, qty) => {
    if (qty > 0) {
      dispatch(updateQuantity({ id, qty }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));  
  };

  return (
    <table cellspacing="0" className="shop_table cart">
      <thead>
        <tr>
          <th className="product-remove">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="cart_item">
            <td className="product-remove">
              <button
                title="Remove this item"
                className="remove"
                onClick={() => handleRemoveItem(item.id)} 
              >
                ×
              </button>
            </td>
            <td className="product-thumbnail">
              <img
                width="145"
                height="145"
                alt={item.name}
                className="shop_thumbnail"
                src={item.imageUrl}
              />
            </td>
            <td className="product-name">{item.name}</td>
            <td className="product-price">
              <span className="amount">{item.price}€</span>
            </td>
            <td className="product-quantity">
              <div className="quantity buttons_added">
                <input
                  type="button"
                  className="minus"
                  value="-"
                  onClick={() => handleUpdateQuantity(item.id, item.qty - 1)}  
                />
                <input
                  type="number"
                  size="4"
                  className="input-text qty text"
                  title="Qty"
                  value={item.qty}
                  min="1"
                  step="1"
                  readOnly
                />
                <input
                  type="button"
                  className="plus"
                  value="+"
                  onClick={() => handleUpdateQuantity(item.id, item.qty + 1)}  
                />
              </div>
            </td>
            <td className="product-subtotal">
              <span className="amount">{(item.price * item.qty).toFixed(2)}€</span>
            </td>
          </tr>
        ))}
        <tr>
          <td className="actions" colSpan="6">
            <input
              type="button"
              onClick={() => (window.location.href = "/Checkout")}
              value="Checkout"
              name="proceed"
              className="checkout-button button alt wc-forward"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PanierItem;
