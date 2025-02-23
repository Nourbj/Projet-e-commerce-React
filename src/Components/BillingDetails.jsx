import { useForm } from 'react-hook-form';

const BillingDetails = ({ billingValid, setBillingValid, setError, watch, trigger }) => {
  const { register, formState: { errors }, setError: setFormError, trigger: triggerField } = useForm();

  const validateField = async (fieldName) => {
    const isValid = await triggerField(fieldName);
    setBillingValid(isValid);
  };

  return (
    <div className="woocommerce-billing-fields">
      <h3>Billing Details</h3>

      <div className="woocommerce-billing-fields__field-wrapper">
        <p className={`form-row form-row-first ${errors.billing_first_name ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="billing_first_name" className="required">
            First Name
          </label>
          <input
            type="text"
            className="input-text"
            name="billing_first_name"
            id="billing_first_name"
            required
            ref={register({ required: "First name is required" })}
            onBlur={() => validateField("billing_first_name")}
          />
          {errors.billing_first_name && <span className="woocommerce-error">{errors.billing_first_name.message}</span>}
        </p>

        <p className={`form-row form-row-last ${errors.billing_last_name ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="billing_last_name" className="required">
            Last Name
          </label>
          <input
            type="text"
            className="input-text"
            name="billing_last_name"
            id="billing_last_name"
            required
            ref={register({ required: "Last name is required" })}
            onBlur={() => validateField("billing_last_name")}
          />
          {errors.billing_last_name && <span className="woocommerce-error">{errors.billing_last_name.message}</span>}
        </p>

        <p className={`form-row form-row-wide ${errors.billing_email ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="billing_email" className="required">
            Email Address
          </label>
          <input
            type="email"
            className="input-text"
            name="billing_email"
            id="billing_email"
            required
            ref={register({ required: "Email address is required", pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
            onBlur={() => validateField("billing_email")}
          />
          {errors.billing_email && <span className="woocommerce-error">{errors.billing_email.message}</span>}
        </p>

        <p className={`form-row form-row-wide ${errors.billing_phone ? 'woocommerce-invalid' : ''}`}>
          <label htmlFor="billing_phone" className="required">
            Phone Number
          </label>
          <input
            type="tel"
            className="input-text"
            name="billing_phone"
            id="billing_phone"
            required
            ref={register({ required: "Phone number is required" })}
            onBlur={() => validateField("billing_phone")}
          />
          {errors.billing_phone && <span className="woocommerce-error">{errors.billing_phone.message}</span>}
        </p>
      </div>
    </div>
  );
};

export default BillingDetails;
