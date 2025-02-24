import { useEffect, useState,useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "../Services/Produit";  
import ProductShop from "../Components/ProductShop";
import CategoryTitle from "../Components/CategoryTitle"; 

const Shop = () => {
  const { category } = useParams();
  const [categoryTitle, setCategoryTitle] = useState('All Products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  const prevCategoryRef = useRef();  

  useEffect(() => {
    const fetchProducts = async () => {
      if (prevCategoryRef.current === category) return;  
      prevCategoryRef.current = category;  
  
      setLoading(true);
      try {
        if (category) {
          const categoryProducts = await getProductsByCategory(category);
          setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1));
          setProducts(categoryProducts);
        } else {
          setCategoryTitle('All Products');
          setProducts([]);
        }
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category]);  
  
  

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  return (
    <div>
      <CategoryTitle categoryTitle={categoryTitle} />

      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            {products.map((product) => {
              if (!product.id) {
                console.error(`Produit sans ID : ${product.name}`);
                return null;
              }

              const priceAfterDiscount = product.price * (1 - (product.discountRate / 100));

              return (
                <div key={product.id} className="col-md-3 col-sm-6">
                  <Link to={`/Shop/${category}/ProductDetails/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ProductShop
                      id={product.id}
                      image={`/img/produts-img/${categoryTitle}/${product.imageName}`}
                      name={product.name}
                      rating={product.review}
                      price={priceAfterDiscount.toFixed(2)}
                      oldPrice={product.price.toFixed(2)}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
