import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Actions";
import { selectCart } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
import {  updateQuantity } from "../Redux/Actions";


function ProductShop({ image, name, link, price, oldPrice, id }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    e.preventDefault(); 
  
    // Accédez à cart.items, qui est un tableau
    const items = cart.items || [];
  
    const existingProduct = items.find((product) => product.id === id);
  
    if (existingProduct) {
      // Si le produit existe déjà, mettez à jour la quantité
      dispatch(updateQuantity(existingProduct.id, existingProduct.qty + 1)); 
    } else {
      // Si le produit n'existe pas, ajoutez-le au panier
      const product = { 
        id: id || new Date().getTime(), 
        name, 
        price, 
        imageName: image, 
        qty: 1 
      };
  
      dispatch(addToCart(product));  
    }
  
    navigate("/cart");  
  };
  

  const handleProductClick = () => {
    navigate(link);
  };

  return (
    <div className="product-item" onClick={handleProductClick}>
      <div className="product-image">
        <img src={image} alt={name} className="img-fluid" />
      </div>
      <h3>{name}</h3>
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