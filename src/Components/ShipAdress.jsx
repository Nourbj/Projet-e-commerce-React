import React from 'react';
import { useForm } from 'react-hook-form';

const ShippingAddress = ({ shippingValid, setShippingValid, setError, watch, trigger }) => {
  const { register, formState: { errors }, setError: setFormError, trigger: triggerField } = useForm();

  const validateField = async (fieldName) => {
    const isValid = await triggerField(fieldName);
    setShippingValid(isValid);
  };

  return (
    <div className="woocommerce-shipping-fields">
      <h3>Shipping Address</h3>

      <div className="woocommerce-shipping-fields__field-wrapper">
        <p className={`form-row form-row-first ${errors.shipping_first_name ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="shipping_first_name" className="required">
            First Name
          </label>
          <input
            type="text"
            className="input-text"
            name="shipping_first_name"
            id="shipping_first_name"
            required
            ref={register({ required: "First name is required" })}
            onBlur={() => validateField("shipping_first_name")}
          />
          {errors.shipping_first_name && <span className="woocommerce-error">{errors.shipping_first_name.message}</span>}
        </p>

        <p className={`form-row form-row-last ${errors.shipping_last_name ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="shipping_last_name" className="required">
            Last Name
          </label>
          <input
            type="text"
            className="input-text"
            name="shipping_last_name"
            id="shipping_last_name"
            required
            ref={register({ required: "Last name is required" })}
            onBlur={() => validateField("shipping_last_name")}
          />
          {errors.shipping_last_name && <span className="woocommerce-error">{errors.shipping_last_name.message}</span>}
        </p>

        <p className={`form-row form-row-wide ${errors.shipping_address_1 ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="shipping_address_1" className="required">
            Address
          </label>
          <input
            type="text"
            className="input-text"
            name="shipping_address_1"
            id="shipping_address_1"
            required
            ref={register({ required: "Shipping address is required" })}
            onBlur={() => validateField("shipping_address_1")}
          />
          {errors.shipping_address_1 && <span className="woocommerce-error">{errors.shipping_address_1.message}</span>}
        </p>

        <p className={`form-row form-row-wide ${errors.shipping_city ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="shipping_city" className="required">
            City
          </label>
          <input
            type="text"
            className="input-text"
            name="shipping_city"
            id="shipping_city"
            required
            ref={register({ required: "City is required" })}
            onBlur={() => validateField("shipping_city")}
          />
          {errors.shipping_city && <span className="woocommerce-error">{errors.shipping_city.message}</span>}
        </p>

        <p className={`form-row form-row-wide ${errors.shipping_postcode ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="shipping_postcode" className="required">
            Postcode
          </label>
          <input
            type="text"
            className="input-text"
            name="shipping_postcode"
            id="shipping_postcode"
            required
            ref={register({ required: "Postcode is required" })}
            onBlur={() => validateField("shipping_postcode")}
          />
          {errors.shipping_postcode && <span className="woocommerce-error">{errors.shipping_postcode.message}</span>}
        </p>

        <p className={`form-row form-row-wide ${errors.shipping_country ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="shipping_country" className="required">
            Country
          </label>
          <input
            type="text"
            className="input-text"
            name="shipping_country"
            id="shipping_country"
            required
            ref={register({ required: "Country is required" })}
            onBlur={() => validateField("shipping_country")}
          />
          {errors.shipping_country && <span className="woocommerce-error">{errors.shipping_country.message}</span>}
        </p>
      </div>
    </div>
  );
};

export default ShippingAddress;
