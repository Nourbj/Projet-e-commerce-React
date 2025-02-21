import { useSelector } from "react-redux";
import PanierItem from "../Components/PanierItem";  
import Intrest from "../Components/Intrest";           
import CartTotals from "../Components/CartTotals";    

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="product-content-right">
              <div className="woocommerce">
                <PanierItem items={cart.items} />
                <div className="cart-collaterals">
                  <Intrest />
                  <CartTotals
                    subTotal={cart.subTotal}
                    tax={cart.tax}
                    total={cart.total}
                  />
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
