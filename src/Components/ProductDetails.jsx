import FileAriane from './FileAriane.jsx';

function ProductDetails({ product }) {
    const getCategoryFromImage = (imageName) => {
        const category = imageName.split('-')[0].toLowerCase(); 
        return category.charAt(0).toUpperCase() + category.slice(1); 
      };
      const category = getCategoryFromImage(product.imageName); 
    return (
        <div className="col-md-8">
            <div className="product-content-right">
                <FileAriane product={product} categoryName={category} />
                <div className="row">
                    <div className="col-sm-6">
                        <div className="product-images">
                            <div className="product-main-img">
                                
                                <img src={`/img/produts-img/${category}/${product.imageName}`}   alt={product.name} />
                            </div>
                            <div className="product-gallery">
                                        <img src="/img/product-thumb-1.jpg" alt=""/>
                                        <img src="/img/product-thumb-2.jpg" alt=""/>
                                        <img src="/img/product-thumb-3.jpg" alt=""/>
                            </div>
                                
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="product-inner">
                            <h2 className="product-name">{product.name}</h2>
                            <div className="product-inner-price">
                                <ins>${product.price}</ins> {product.oldPrice && <del>${product.oldPrice}</del>}
                            </div>
                            <form action="" className="cart">
                                <div className="quantity">
                                    <input
                                        type="number"
                                        size={4}
                                        className="input-text qty text"
                                        title="Qty"
                                        defaultValue={1}
                                        name="quantity"
                                        min={1}
                                        step={1}
                                    />
                                </div>
                                <button className="add_to_cart_button" type="submit">
                                    Add to cart
                                </button>
                            </form>
                            <div className="product-inner-category">
                                <h2>Product Description</h2>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;