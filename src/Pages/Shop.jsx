import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "../Services/Produit";  
import ProductShop from "../Components/ProductShop";
import CategoryTitle from "../Components/CategoryTitle"; 

const Shop = () => {
  const { category } = useParams();
  const [categoryTitle, setCategoryTitle] = useState('All Products');
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
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
        console.error('Erreur de chargement des produits', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <CategoryTitle categoryTitle={categoryTitle} />

      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            {products.map((product) => {
              const priceAfterDiscount = product.price * (1 - (product.discountRate / 100));

              return (
                <div key={product.id} className="col-md-3 col-sm-6">
                  {/* Modifier le lien pour rediriger vers la page de détail du produit */}
                  <Link to={`/Shop/${category}/ProductDetails/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ProductShop
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
