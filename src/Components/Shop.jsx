import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import ProductItem from "../Components/ProductItem";

const Shop = () => {
  const { category } = useParams();
  const [categoryTitle, setCategoryTitle] = useState('');
  const [products, setProducts] = useState([]); // L'état pour les produits
  const [loading, setLoading] = useState(true); // L'état de chargement
  const [error, setError] = useState(''); // L'état d'erreur


  const fetchProducts = async (category) => {
    try {
      const response = await fetch('http://localhost:3000/products-lists');
      const data = await response.json();
      const selectedCategory = data.find(item => item.id === category);
      if (selectedCategory) {
        setProducts(selectedCategory.items); // Mettre à jour les produits en fonction de la catégorie
      } else {
        setProducts([]); // Si aucune catégorie trouvée, vider les produits
      }
      setLoading(false);
    } catch (error) {
      setError('Erreur de chargement des produits');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Mettre à jour le titre de la catégorie
    if (category) {
      setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1));
    } else {
      setCategoryTitle('All Products');
    }

    fetchProducts(category); // Appeler la fonction de récupération des produits
  }, [category]); // Recharger lorsque la catégorie change

 

  return (
    <div>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2 className="text-dark">{categoryTitle}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show products */}
      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            {/* Loop through products */}
            <div className="col-md-3 col-sm-6">
              <div className="single-shop-product">
                <div className="product-upper">
                  <img src="img/product-2.jpg" alt="" />
                </div>
                <h2><a href="product.html">Apple new mac book 2015 March </a></h2>
                <div className="product-carousel-price">
                  <ins>$899.00</ins> <del>$999.00</del>
                </div>  
                <div className="product-option-shop">
                  <a className="add_to_cart_button" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                </div>                       
              </div>
            </div>
            {/* Repeat the product block for other products */}
            <div className="col-md-3 col-sm-6">
              <div className="single-shop-product">
                <div className="product-upper">
                  <img src="img/product-1.jpg" alt="" />
                </div>
                <h2><a href="">Apple new mac book 2015 March :P</a></h2>
                <div className="product-carousel-price">
                  <ins>$899.00</ins> <del>$999.00</del>
                </div>  
                <div className="product-option-shop">
                  <a className="add_to_cart_button" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                </div>                       
              </div>
            </div>
            {/* Add more product blocks here... */}

          </div>
        </div>
      </div>

      {/* Pagination (optional) */}
      <div className="row">
        <div className="col-md-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
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
  );
};

export default Shop;
