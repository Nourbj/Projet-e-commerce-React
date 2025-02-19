import React, { useEffect, useState } from 'react';

const CategoryProduct = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer les produits basés sur la catégorie (assurez-vous que votre API est correcte)
    fetch(`http://localhost:3000/products?categoryId=${categoryId}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [categoryId]);

  return (
    <div>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>Samsung</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            {products.length > 0 ? (
              products.map(product => (
                <div className="col-md-3 col-sm-6" key={product.id}>
                  <div className="single-shop-product">
                    <div className="product-upper">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <h2><a href={`product/${product.id}`}>{product.name}</a></h2>
                    <div className="product-carousel-price">
                      <ins>${product.price}</ins> <del>${product.originalPrice}</del>
                    </div>
                    <div className="product-option-shop">
                      <a
                        className="add_to_cart_button"
                        data-quantity="1"
                        data-product_sku={product.sku}
                        data-product_id={product.id}
                        rel="nofollow"
                        href={`/canvas/shop/?add-to-cart=${product.id}`}
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-12">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1">
                      Previous
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
