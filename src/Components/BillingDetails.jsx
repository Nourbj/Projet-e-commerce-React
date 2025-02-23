import React from 'react';
import { useForm } from 'react-hook-form';

const BillingDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Here, you can send or process the data
  };

  return (
    <div className="col-6">
      <div className="woocommerce-billing-fields">
        <h3>Billing Details</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <label htmlFor="billing_country">
              Civility <abbr className="required" title="required">*</abbr>
            </label>
            <select
              {...register("billing_country", { required: "Civility is required" })}
              id="billing_country"
              name="billing_country"
            >
              <option value="">Select Civility</option>
              <option value="AX">Mr</option>
              <option value="AF">Mlle</option>
              <option value="AF">Mme</option>
            </select>
            {errors.billing_country && <span className="error">{errors.billing_country.message}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="billing_first_name">
              First Name <abbr className="required" title="required">*</abbr>
            </label>
            <input
              {...register("billing_first_name", { required: "First Name is required" })}
              id="billing_first_name"
              type="text"
            />
            {errors.billing_first_name && <span className="error">{errors.billing_first_name.message}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="billing_last_name">
              Last Name <abbr className="required" title="required">*</abbr>
            </label>
            <input
              {...register("billing_last_name", { required: "Last Name is required" })}
              id="billing_last_name"
              type="text"
            />
            {errors.billing_last_name && <span className="error">{errors.billing_last_name.message}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="billing_email">
              Email Address <abbr className="required" title="required">*</abbr>
            </label>
            <input
              {...register("billing_email", { 
                required: "Email is required", 
                pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Invalid email address" } 
              })}
              id="billing_email"
              type="email"
            />
            {errors.billing_email && <span className="error">{errors.billing_email.message}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="billing_phone">
              Phone <abbr className="required" title="required">*</abbr>
            </label>
            <input
              {...register("billing_phone", { 
                required: "Phone is required", 
                pattern: { value: /^[0-9]{10}$/, message: "Phone must be a 10 digit number" } 
              })}
              id="billing_phone"
              type="text"
            />
            {errors.billing_phone && <span className="error">{errors.billing_phone.message}</span>}
          </div>

        </form>
      </div>
    </div>
  );
};

export default BillingDetails;
