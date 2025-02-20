import '../assets/css/font-awesome.min.css'
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

import CategoryTitle from "../Components/CategoryTitle"; 
import BillingDetails from '../Components/BuillingDetails';
import ShipAdress from '../Components/ShipAdress';
import Payment from '../Components/Payment';
import Order  from '../Components/Order';




const Checkout = () => {   
return (   
    
    <div>
        <CategoryTitle categoryTitle="Checkout" />
        <div className="single-product-area">
        <div className="zigzag-bottom" />
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="product-content-right">
                        <div className="woocommerce">
                            <form
                                action="#"
                                className="checkout"
                                encType="multipart/form-data"
                                method="post"
                                name="checkout">
                                <div className="col2-set" id="customer_details">
                                    <BillingDetails />
                                     <ShipAdress />
                                </div>
                                <h3 id="order_review_heading">Your order</h3>
                                <div
                                    id="order_review"
                                    style={{
                                        position: "relative",
                                    }}>
                                   <Order />
                                   <Payment />
                                   <div className="form-row place-order">
                                            <input
                                                className="button alt"
                                                data-value="Place order"
                                                defaultValue="Place order"
                                                id="place_order"
                                                name="woocommerce_checkout_place_order"
                                                type="button" />
                                        </div>
                                        <div className="clear" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
  };
export default Checkout;

