import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../assets/css/font-awesome.min.css'
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import Pagination from '../Components/Pagination';
import ProductShop from "../Components/ProductShop";
import CategoryTitle from "../Components/CategoryTitle"; 
import { Link } from 'react-router-dom';

const API_BASE_URL = "http://localhost:3000";

// Retourne tous les produits
const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products-lists`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
    throw error;
  }
};

const Shop = () => {
  const { category } = useParams();
  const [categoryTitle, setCategoryTitle] = useState('All Products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductsByCategory(category);

        if (category) {
          setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1));
          const selectedCategory = data.find(item => item.name.toLowerCase() === category.toLowerCase());
          if (selectedCategory) {
            setProducts(selectedCategory.items);
          } else {
            setProducts([]);
          }
        } else {
          setCategoryTitle('All Products');
          setProducts(data.flatMap(item => item.items));
        }
      } catch (error) {
        setError('Erreur de chargement des produits');
      } finally {
        setLoading(false);
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
  {loading ? (
    <p>Chargement des produits...</p>
  ) : error ? (
    <p className="text-danger">{error}</p>
  ) : products.length > 0 ? (
    products.map((product) => {
      const priceAfterDiscount = product.price * (1 - (product.discountRate / 100));

      return (
        <div key={product.id} className="col-md-3 col-sm-6">
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
    })
  ) : (
    <p>Aucun produit trouvé.</p>
  )}
</div>
</div>
</div>
      <Pagination />
    </div>
  );
};

export default Shop;
