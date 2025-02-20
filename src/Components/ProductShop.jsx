function ProductShop({ image, name, link, rating, price, oldPrice }) {
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
        {oldPrice && <del>${oldPrice}</del>} {/* Affiche le prix barré */}
      </div>

      <div className="product-add-to-cart">
        <a href={`/canvas/shop/?add-to-cart=${link}`} className="btn btn-primary" rel="nofollow">
          Add to Cart
        </a>
      </div>
    </div>
  );
}

export default ProductShop;
