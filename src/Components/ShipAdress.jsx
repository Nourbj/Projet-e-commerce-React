import '../assets/css/font-awesome.min.css'
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';


const ShipAdress = () => { 
    
    
return (   
    <div className="col-6">
    <div className="woocommerce-shipping-fields">
        <h3 id="ship-to-different-address">
            <label
                className="checkbox"
                htmlFor="ship-to-different-address-checkbox">
                Ship to a different address?
            </label>
            <input
                className="input-checkbox"
                defaultChecked
                defaultValue="1"
                id="ship-to-different-address-checkbox"
                name="ship_to_different_address"
                type="checkbox" />
        </h3>
        <div
            className="shipping_address"
            style={{
                display: "block",
            }}>
            <p
                className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated"
                id="shipping_country_field">
                <label className="" htmlFor="shipping_country">
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
                id="shipping_first_name_field">
                <label className="" htmlFor="shipping_first_name">
                    First Name{" "}
                    <abbr className="required" title="required">
                        *
                    </abbr>
                </label>
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_first_name"
                    name="shipping_first_name"
                    placeholder=""
                    type="text" />
            </p>
            <p
                className="form-row form-row-last validate-required"
                id="shipping_last_name_field">
                <label className="" htmlFor="shipping_last_name">
                    Last Name{" "}
                    <abbr className="required" title="required">
                        *
                    </abbr>
                </label>
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_last_name"
                    name="shipping_last_name"
                    placeholder=""
                    type="text" />
            </p>
            <div className="clear" />
            <p
                className="form-row form-row-wide"
                id="shipping_company_field">
                <label className="" htmlFor="shipping_company">
                    Company Name
                </label>
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_company"
                    name="shipping_company"
                    placeholder=""
                    type="text" />
            </p>
            <p
                className="form-row form-row-wide address-field validate-required"
                id="shipping_address_1_field">
                <label className="" htmlFor="shipping_address_1">
                    Address{" "}
                    <abbr className="required" title="required">
                        *
                    </abbr>
                </label>
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_address_1"
                    name="shipping_address_1"
                    placeholder="Street address"
                    type="text" />
            </p>
            <p
                className="form-row form-row-wide address-field"
                id="shipping_address_2_field">
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_address_2"
                    name="shipping_address_2"
                    placeholder="Apartment, suite, unit etc. (optional)"
                    type="text" />
            </p>
            <p
                className="form-row form-row-wide address-field validate-required"
                data-o_class="form-row form-row-wide address-field validate-required"
                id="shipping_city_field">
                <label className="" htmlFor="shipping_city">
                    Town / City{" "}
                    <abbr className="required" title="required">
                        *
                    </abbr>
                </label>
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_city"
                    name="shipping_city"
                    placeholder="Town / City"
                    type="text" />
            </p>
            <p
                className="form-row form-row-first address-field validate-state"
                data-o_class="form-row form-row-first address-field validate-state"
                id="shipping_state_field">
                <label className="" htmlFor="shipping_state">
                    County
                </label>
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_state"
                    name="shipping_state"
                    placeholder="State / County"
                    type="text" />
            </p>
            <p
                className="form-row form-row-last address-field validate-required validate-postcode"
                data-o_class="form-row form-row-last address-field validate-required validate-postcode"
                id="shipping_postcode_field">
                <label className="" htmlFor="shipping_postcode">
                    Postcode{" "}
                    <abbr className="required" title="required">
                        *
                    </abbr>
                </label>
                <input
                    className="input-text "
                    defaultValue=""
                    id="shipping_postcode"
                    name="shipping_postcode"
                    placeholder="Postcode / Zip"
                    type="text" />
            </p>
            <div className="clear" />
        </div>
        <p className="form-row notes" id="order_comments_field">
            <label className="" htmlFor="order_comments">
                Order Notes
            </label>
            <textarea
                className="input-text "
                cols="5"
                id="order_comments"
                name="order_comments"
                placeholder="Notes about your order, e.g. special notes for delivery."
                rows="2" />
        </p>
    </div>
</div>
  
  )
  };
export default ShipAdress;

