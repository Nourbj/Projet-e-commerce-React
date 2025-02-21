import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
 
function ProductWidget({ title, apiUrl }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); 
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
 
    fetchProducts();
  }, [apiUrl]);
 
  const getCategoryFromImage = (imageName) => {
    const category = imageName.split('-')[0].toLowerCase();
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
 
  const handleViewAllClick = () => {
    setShowAll(!showAll);
  };
 
  const productsToDisplay = showAll ? products : products.slice(0, 2);
 
  return (
    <div className="col-md-4">
      <div className="single-product-widget">
        <h2 className="product-wid-title">{title}</h2>
        <a href="#" onClick={handleViewAllClick} className="wid-view-more">
          {showAll ? 'View Less' : 'View All'}
        </a>
 
        {loading ? (
          <p>Loading products...</p>
        ) : productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => {
            const category = getCategoryFromImage(product.imageName);
 
            return (
              <ProductItem
                key={product.id}
                image={`/img/produts-img/${category}/${product.imageName}`}
                name={product.name}
                link={`single-product/${product.id}`}
                rating={product.review}
                price={product.price}
                oldPrice={product.price + (product.price * (product.discountRate / 100))}
              />
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
 
export default ProductWidget;