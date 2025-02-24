import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getProductById } from "../Services/Produit";
import Cookies from "js-cookie";
import {  getCategoryFromImage } from "../Services/Categorie"; 

function ProductWidget({ title, apiUrl, showViewAllButton = true, showTitle = true }) //props 
{  
  const [products, setProducts] = useState([]); // stocker les produits
  const [showAll, setShowAll] = useState(false);
  const [hasRecentlyViewed, setHasRecentlyViewed] = useState(false);

  useEffect(() => { //se déclenche à chaque changement de title ou apiUrl. Il va récupérer les données (produits et catégories) 
    const fetchData = async () => {

      if (title === "Recently Viewed") {
        let viewedProducts = Cookies.get("recentlyViewed");  //Récupère les produits vus récemment dans les cookies
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
    };

    fetchData();
  }, [title, apiUrl]);  

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

        {displayedProducts.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default ProductWidget;
