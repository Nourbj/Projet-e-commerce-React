import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getProductById } from "../Services/Produit";  
import "../assets/css/style.css";

const API_BASE_URL = "http://localhost:3000";

const fetchProductsByCategory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products-lists`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits", error);
    throw error;
  }
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Stocke tous les produits
  const { productId, category } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductsByCategory();
        if (category) {
          setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1));
          const selectedCategory = data.find(item => item.name.toLowerCase() === category.toLowerCase());
          if (selectedCategory) {
            setProducts(selectedCategory.items);
          } else {
            setProducts([]);
          }
        } else {
          setCategoryTitle("All Products");
          setProducts(data.flatMap(item => item.items));
        }
      } catch (error) {
        setError("Erreur de chargement des produits");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  // Charger tous les produits une seule fois
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchAllProducts();
  }, []);

  // Charger un produit spécifique si un ID est fourni
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const data = await getProductById(productId);
        setProduct(data);
      }
    };

    fetchProduct();
  }, [productId]);

  // Filtrage des produits localement dès qu'une recherche est effectuée
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    // Filtrer uniquement les produits dont le nom commence par la lettre tapée
    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().startsWith(query)
    );

    setSearchResults(filteredResults);
  };

  // Affichage de chargement si le produit spécifique est en attente
  if (productId && !product) {
    return <p>Chargement du produit...</p>;
  }

  return (
    <div className="search-container">
      <div className="header-search">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <ul className="results-list">
            {searchResults.map((result) => (
              <li key={result.id} className="result-item">
                <Link
                  to={`/Shop/${category}/ProductDetails/${result.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span>{result.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
