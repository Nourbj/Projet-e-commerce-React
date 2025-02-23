import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { getProducts, getProductById } from "../Services/Produit";

import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import Cookies from "js-cookie";

function ProductWidget({ title, apiUrl, showViewAllButton = true, showTitle = true }) {  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [hasRecentlyViewed, setHasRecentlyViewed] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      if (title === "Recently Viewed") {
        let viewedProducts = Cookies.get("recentlyViewed");
        viewedProducts = viewedProducts ? JSON.parse(viewedProducts) : [];

        if (viewedProducts.length > 0) {
          setHasRecentlyViewed(true);
          const productDetails = await Promise.all(viewedProducts.map(id => getProductById(id)));
          setProducts(productDetails);
        } else {
          setHasRecentlyViewed(false);
          setProducts([]);
        }
      } else if (apiUrl) {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error('Failed to fetch products');
          const fetchedProducts = await response.json();
          setProducts(fetchedProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
        }
      }

      setLoading(false);
    };

    fetchProducts();
  }, [title, apiUrl]);

  const getCategoryFromImage = (imageName) => {
    if (!imageName) return "Unknown";  
    const category = imageName.split("-")[0].toLowerCase();
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    setShowAll(!showAll);
  };

  const displayedProducts = showAll ? products : products.slice(0, 2);

  return (
    <div className="col-md-4">
      <div className="single-product-widget">
        {showTitle && (title !== "Recently Viewed" || hasRecentlyViewed) && (
          <h2 className="product-wid-title">{title}</h2>
        )}

        {loading ? (
          <p>Loading products...</p>
        ) : displayedProducts.length > 0 ? (
          <>
            {displayedProducts.map((product) => {
              const category = getCategoryFromImage(product.imageName);

              return (
                <ProductItem
                  key={product.id || Math.random()} 
                  image={`/img/produts-img/${category}/${product.imageName || 'default.png'}`}
                  name={product.name}
                  link={`single-product/${product.id}`}
                  rating={product.review}
                  price={product.price}
                  oldPrice={product.discountRate ? product.price + (product.price * (product.discountRate / 100)) : product.price}
                />
              );
            })}
            {showViewAllButton && products.length > 2 && (
              <a href="#" onClick={handleViewAllClick} className="wid-view-more">
                {showAll ? 'View Less' : 'View All'}
              </a>
            )}
          </>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default ProductWidget;
