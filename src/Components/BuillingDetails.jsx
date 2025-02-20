import '../assets/css/font-awesome.min.css'
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';


const BillingDetails = () => { 
    
    
return (   
    <div className="col-6">
    <div className="woocommerce-billing-fields">
        <h3>Billing Details</h3>
        <p
            className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated"
            id="billing_country_field">
            <label className="" htmlFor="billing_country">
                Civility{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <select
                className="country_to_state country_select"
                id="shipping_country"
                name="shipping_country">
                <option value="AX">Mr</option>
                <option value="AF">Mlle</option>
                <option value="AF">Mme</option>
            </select>
        </p>
        <p
            className="form-row form-row-first validate-required"
            id="billing_first_name_field">
            <label className="" htmlFor="billing_first_name">
                First Name{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_first_name"
                name="billing_first_name"
                placeholder=""
                type="text" />
        </p>
        <p
            className="form-row form-row-last validate-required"
            id="billing_last_name_field">
            <label className="" htmlFor="billing_last_name">
                Last Name{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_last_name"
                name="billing_last_name"
                placeholder=""
                type="text" />
        </p>
        <div className="clear" />
        <p
            className="form-row form-row-wide"
            id="billing_company_field">
            <label className="" htmlFor="billing_company">
                Company Name
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_company"
                name="billing_company"
                placeholder=""
                type="text" />
        </p>
        <p
            className="form-row form-row-wide address-field validate-required"
            id="billing_address_1_field">
            <label className="" htmlFor="billing_address_1">
                Address{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_address_1"
                name="billing_address_1"
                placeholder="Street address"
                type="text" />
        </p>
        <p
            className="form-row form-row-wide address-field"
            id="billing_address_2_field">
            <input
                className="input-text "
                defaultValue=""
                id="billing_address_2"
                name="billing_address_2"
                placeholder="Apartment, suite, unit etc. (optional)"
                type="text" />
        </p>
        <p
            className="form-row form-row-wide address-field validate-required"
            data-o_class="form-row form-row-wide address-field validate-required"
            id="billing_city_field">
            <label className="" htmlFor="billing_city">
                Town / City{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_city"
                name="billing_city"
                placeholder="Town / City"
                type="text" />
        </p>
        <p
            className="form-row form-row-first address-field validate-state"
            data-o_class="form-row form-row-first address-field validate-state"
            id="billing_state_field">
            <label className="" htmlFor="billing_state">
                County
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_state"
                name="billing_state"
                placeholder="State / County"
                type="text" />
        </p>
        <p
            className="form-row form-row-last address-field validate-required validate-postcode"
            data-o_class="form-row form-row-last address-field validate-required validate-postcode"
            id="billing_postcode_field">
            <label className="" htmlFor="billing_postcode">
                Postcode{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_postcode"
                name="billing_postcode"
                placeholder="Postcode / Zip"
                type="text" />
        </p>
        <div className="clear" />
        <p
            className="form-row form-row-first validate-required validate-email"
            id="billing_email_field">
            <label className="" htmlFor="billing_email">
                Email Address{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_email"
                name="billing_email"
                placeholder=""
                type="text" />
        </p>
        <p
            className="form-row form-row-last validate-required validate-phone"
            id="billing_phone_field">
            <label className="" htmlFor="billing_phone">
                Phone{" "}
                <abbr className="required" title="required">
                    *
                </abbr>
            </label>
            <input
                className="input-text "
                defaultValue=""
                id="billing_phone"
                name="billing_phone"
                placeholder=""
                type="text" />
        </p>
        <div className="clear" />
    </div>
</div>
  
  )
  };
export default BillingDetails;

