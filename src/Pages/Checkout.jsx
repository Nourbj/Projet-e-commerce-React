import '../assets/css/font-awesome.min.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

import CategoryTitle from "../Components/CategoryTitle";
import Payment from '../Components/Payment';
import Order from '../Components/Order';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'; 

const Checkout = () => {
  const { register, handleSubmit, formState: { errors }, setError, watch, trigger } = useForm();
  
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [billingValid, setBillingValid] = useState(true);
  const [shippingValid, setShippingValid] = useState(true);
  const [paymentValid, setPaymentValid] = useState(true);

  const orderData = {
    id: new Date().toISOString(),
    total,
    subTotal,
    tax,
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      imageName: item.imageName,
      price: item.price,
      qty: item.qty
    })),
    customer: {
      email: watch("billing_email"),
      phone: watch("billing_phone"),
      billingAddress: {
        civility: watch("billing_country"),
        firstName: watch("billing_first_name"),
        lastName: watch("billing_last_name"),
        zipCode: watch("billing_postcode"),
        street: watch("shipping_address_1"),
        companyName: watch("shipping_company"),
        county: watch("shipping_country"),
        city: watch("shipping_city")
      },
      shippingAddress: {
        civility: watch("shipping_country"),
        firstName: watch("shipping_first_name"),
        lastName: watch("shipping_last_name"),
        zipCode: watch("shipping_postcode"),
        street: watch("shipping_address_1"),
        city: watch("shipping_city")
      }
    }
  };

  const validateBillingDetails = async () => {
    const isValid = await trigger("billing_country") && await trigger("billing_first_name") && await trigger("billing_last_name") && await trigger("billing_email") && await trigger("billing_phone");
    setBillingValid(isValid);
    return isValid;
  };

  const validateShippingAddress = async () => {
    const isValid = await trigger("shipping_country") && await trigger("shipping_first_name") && await trigger("shipping_last_name") && await trigger("shipping_address_1") && await trigger("shipping_city") && await trigger("shipping_postcode");
    setShippingValid(isValid);
    return isValid;
  };

  const validatePayment = async () => {
    const isValid = await trigger("payment_method"); 
    setPaymentValid(isValid);
    return isValid;
  };

  const handlePlaceOrder = async () => {
    // Valider les champs de facturation, expédition et paiement
    const isBillingValid = await validateBillingDetails();
    const isShippingValid = await validateShippingAddress();
    const isPaymentValid = await validatePayment();
  
    // Si une des validations échoue, afficher une erreur
    if (!isBillingValid || !isShippingValid || !isPaymentValid) {
      toast.error("Please fill out all required fields correctly.");
      return;  
    }
  
    // Essayez de soumettre la commande à l'API
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData), // envoyer les données sous forme JSON
      });
  
      if (!response.ok) {
        throw new Error('Order placement failed');
      }
  
      const data = await response.json();
      console.log('Order placed successfully:', data);
      toast.success('Your order has been placed successfully!');
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('There was an error placing your order.');
    }
  };
  
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
                      <div className="col-6">
                        <div className="woocommerce-billing-fields">
                          <h3>Billing Details</h3>
                          <p className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated" id="billing_country_field">
                            <label className="" htmlFor="billing_country">Civility <abbr className="required" title="required">*</abbr></label>
                            <select {...register("billing_country", { required: true })} id="billing_country" name="billing_country">
                              <option value="AX">Mr</option>
                              <option value="AF">Mlle</option>
                              <option value="AF">Mme</option>
                            </select>
                            {errors.billing_country && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-first validate-required" id="billing_first_name_field">
                            <label className="" htmlFor="billing_first_name">First Name <abbr className="required" title="required">*</abbr></label>
                            <input {...register("billing_first_name", { required: true })} id="billing_first_name" type="text" />
                            {errors.billing_first_name && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-last validate-required" id="billing_last_name_field">
                            <label className="" htmlFor="billing_last_name">Last Name <abbr className="required" title="required">*</abbr></label>
                            <input {...register("billing_last_name", { required: true })} id="billing_last_name" type="text" />
                            {errors.billing_last_name && <span>This field is required</span>}
                          </p>

                          <div className="clear" />

                          <p className="form-row form-row-wide" id="billing_company_field">
                            <label className="" htmlFor="billing_company">Company Name</label>
                            <input {...register("billing_company")} id="billing_company" type="text" />
                          </p>

                          <p className="form-row form-row-wide address-field validate-required" id="billing_address_1_field">
                            <label className="" htmlFor="billing_address_1">Address <abbr className="required" title="required">*</abbr></label>
                            <input {...register("billing_address_1", { required: true })} id="billing_address_1" type="text" />
                            {errors.billing_address_1 && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-wide address-field validate-required" id="billing_city_field">
                            <label className="" htmlFor="billing_city">Town / City <abbr className="required" title="required">*</abbr></label>
                            <input {...register("billing_city", { required: true })} id="billing_city" type="text" />
                            {errors.billing_city && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-first address-field validate-required" id="billing_postcode_field">
                            <label className="" htmlFor="billing_postcode">Postcode <abbr className="required" title="required">*</abbr></label>
                            <input {...register("billing_postcode", { required: true })} id="billing_postcode" type="text" />
                            {errors.billing_postcode && <span>This field is required</span>}
                          </p>

                          <div className="clear" />

                          <p className="form-row form-row-first validate-required validate-email" id="billing_email_field">
                            <label className="" htmlFor="billing_email">Email Address <abbr className="required" title="required">*</abbr></label>
                            <input {...register("billing_email", { required: true })} id="billing_email" type="text" />
                            {errors.billing_email && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-last validate-required validate-phone" id="billing_phone_field">
                            <label className="" htmlFor="billing_phone">Phone <abbr className="required" title="required">*</abbr></label>
                            <input {...register("billing_phone", { required: true })} id="billing_phone" type="text" />
                            {errors.billing_phone && <span>This field is required</span>}
                          </p>

                          <div className="clear" />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="woocommerce-shipping-fields">
                          <h3>Shipping Details</h3>

                          <p className="form-row form-row-wide address-field update_totals_on_change validate-required" id="shipping_country_field">
                            <label className="" htmlFor="shipping_country">Civility <abbr className="required" title="required">*</abbr></label>
                            <select {...register("shipping_country", { required: true })} id="shipping_country" name="shipping_country">
                              <option value="AX">Mr</option>
                              <option value="AF">Mlle</option>
                              <option value="AF">Mme</option>
                            </select>
                            {errors.shipping_country && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-first validate-required" id="shipping_first_name_field">
                            <label className="" htmlFor="shipping_first_name">First Name <abbr className="required" title="required">*</abbr></label>
                            <input {...register("shipping_first_name", { required: true })} id="shipping_first_name" type="text" />
                            {errors.shipping_first_name && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-last validate-required" id="shipping_last_name_field">
                            <label className="" htmlFor="shipping_last_name">Last Name <abbr className="required" title="required">*</abbr></label>
                            <input {...register("shipping_last_name", { required: true })} id="shipping_last_name" type="text" />
                            {errors.shipping_last_name && <span>This field is required</span>}
                          </p>

                          <div className="clear" />

                          <p className="form-row form-row-wide address-field validate-required" id="shipping_address_1_field">
                            <label className="" htmlFor="shipping_address_1">Address <abbr className="required" title="required">*</abbr></label>
                            <input {...register("shipping_address_1", { required: true })} id="shipping_address_1" type="text" />
                            {errors.shipping_address_1 && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-wide address-field validate-required" id="shipping_city_field">
                            <label className="" htmlFor="shipping_city">Town / City <abbr className="required" title="required">*</abbr></label>
                            <input {...register("shipping_city", { required: true })} id="shipping_city" type="text" />
                            {errors.shipping_city && <span>This field is required</span>}
                          </p>

                          <p className="form-row form-row-first address-field validate-required" id="shipping_postcode_field">
                            <label className="" htmlFor="shipping_postcode">Postcode <abbr className="required" title="required">*</abbr></label>
                            <input {...register("shipping_postcode", { required: true })} id="shipping_postcode" type="text" />
                            {errors.shipping_postcode && <span>This field is required</span>}
                          </p>

                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                    <h3 id="order_review_heading">Your order</h3>
                                <div
                                    id="order_review"
                                    style={{
                                        position: "relative",
                                    }}>
                                   <Order /> </div>

                    <div id="payment" className="woocommerce-checkout-payment">
                      <h3>Payment</h3>

                      <Payment />

                      <div className="form-row place-order">
  <button
    type="button"
    onClick={handlePlaceOrder} // Calls the order placement handler
    className={`button alt${orderPlaced ? ' disabled' : ''}`} // Disable button after order is placed
    disabled={orderPlaced} // Disable the button once the order is placed
  >
    {orderPlaced ? "Order Placed" : "Place Order"} {/* Button text changes when order is placed */}
  </button>
</div>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
