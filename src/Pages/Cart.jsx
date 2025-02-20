import PanierItem from "../Components/PanierItem";
import CartTotals from "../Components/CartTotals";
import Intrest from "../Components/Intrest";



const Cart = () => {
  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
              <PanierItem />
                <div className="cart-collaterals">
                 <Intrest />

                  <CartTotals />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
