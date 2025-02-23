import { useState } from 'react';

function ProductDetails({ product }) {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('Produit ajouté au panier!');
  };

  return (
    <div className="col-md-8">
      <div className="product-content-right">
        <div className="row">
          <div className="col-sm-6">
            <div className="product-images">
              <div className="product-main-img">
                <img
                  src={`/img/produts-img/${product.category}/${product.imageName}`}
                  alt={product.name}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="product-inner">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-inner-price">
                <ins>${product.price}</ins>
                {product.oldPrice && <del>${product.oldPrice}</del>}
              </div>
              <button 
                  className="add_to_cart_button" 
                  onClick={handleClick} 
                  aria-label="Add to cart"
                >
                  Add to cart
                </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
