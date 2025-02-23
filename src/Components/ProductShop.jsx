import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Actions"; 
import { selectCart } from "../Redux/Store"; 

function ProductShop({ image, name, link, price, oldPrice, id }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart); 
  const handleAddToCart = () => {
    const product = { id, name, price, imageName: image };
    dispatch(addToCart(product, 1));  
  };
  

  return (
    <div className="product-item">
      <div className="product-image">
        <a href={link}>
          <img src={image} alt={name} className="img-fluid" />
        </a>
      </div>
      <h3>
        <a href={link}>{name}</a>
      </h3>
      <div className="product-price">
        <ins>${price}</ins>
        {oldPrice && <del>${oldPrice}</del>}
      </div>

      <div className="product-add-to-cart">
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductShop;
