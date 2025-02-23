import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Redux/Actions";

function PanierItem({ items }) {
  const dispatch = useDispatch();

  const getCategoryFromImage = (imageName) => {
    const category = imageName.split("-")[0].toLowerCase();
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div>
      <table cellSpacing={0} className="shop_table cart">
        <thead>
          <tr>
            <th className="product-remove">&nbsp;</th>
            <th className="product-name">Product</th>
            <th className="product-price">Price</th>
            <th className="product-quantity">Quantity</th>
            <th className="product-subtotal">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const category = getCategoryFromImage(item.imageName);
            const price = Number(item.price);
            return (
              <tr key={item.id} className="cart_item">
                {/* Product Remove Column */}
                <td className="product-remove">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="remove"
                    title="Remove this item"
                  >
                    ×
                  </button>
                </td>

                {/* Product Name Column */}
                <td className="product-name">{item.name}</td>

                {/* Price Column */}
                <td className="product-price">
                  <span className="amount">${price.toFixed(2)}</span>
                </td>

                {/* Quantity Column */}
                <td className="product-quantity">
                  <div className="quantity buttons_added">
                    {/* Bouton - */}
                    <button
                      className="minus"
                      onClick={() => {
                        if (item.qty === 1) {
                          dispatch(removeFromCart(item.id));
                        } else {
                          dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }));
                        }
                      }}
                    >
                      -
                    </button>

                    {/* Input quantité */}
                    <input
                      type="number"
                      size={4}
                      className="input-text qty text"
                      title="Qty"
                      value={item.qty}
                      min={1}
                      onChange={(e) => {
                        const newQty = Number(e.target.value);
                        if (newQty > 0) {
                          dispatch(updateQuantity({ id: item.id, qty: newQty }));
                        }
                      }}
                    />

                    {/* Bouton + */}
                    <button
                      className="plus"
                      onClick={() => dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }))}
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Subtotal Column */}
                <td className="product-subtotal">
                  <span className="amount">${(price * item.qty).toFixed(2)}</span>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="actions" colSpan={5}>
              <Link to="/checkout">
                <button type="button" className="checkout-button button alt wc-forward">
                  Checkout
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PanierItem;
