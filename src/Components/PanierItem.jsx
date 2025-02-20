import '../assets/css/font-awesome.min.css'
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const PanierItem = () => {
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
      <tr className="cart_item">
        <td className="product-remove">
          <a title="Remove this item" className="remove" href="#">
            ×
          </a>
        </td>

        <td className="product-thumbnail">
          <a href="single-product.html">
            <img
              width="145"
              height="145"
              alt="poster_1_up"
              className="shop_thumbnail"
              src="img/product-thumb-2.jpg"
            />
          </a>
        </td>

        <td className="product-name">
          <a href="single-product.html">Ship Your Idea</a>
        </td>

        <td className="product-price">
          <span className="amount">15.00€</span>
        </td>

        <td className="product-quantity">
          <div className="quantity buttons_added">
            <input type="button" className="minus" value="-" />
            <input
              type="number"
              size="4"
              className="input-text qty text"
              title="Qty"
              value="1"
              min="0"
              step="1"
            />
            <input type="button" className="plus" value="+" />
          </div>
        </td>

        <td className="product-subtotal">
          <span className="amount">15.00 €</span>
        </td>
      </tr>
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
  )
};

export default PanierItem;
