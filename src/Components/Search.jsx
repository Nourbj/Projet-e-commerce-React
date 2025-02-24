import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getProductsByCategory, getProductById } from "../Services/Produit";
import "../assets/css/style.css";

const API_BASE_URL = "http://localhost:3000";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { productId, category = "all" } = useParams(); // Valeur par défaut pour category
  const [product, setProduct] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategory();

        if (category) {
          setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1));
          const selectedCategory = data.find(
            (item) => item.name.toLowerCase() === category.toLowerCase()
          );
          setProducts(selectedCategory ? selectedCategory.items : []);
        } else {
          setCategoryTitle("All Products");
          setProducts(data.flatMap((item) => item.items));
        }
      } catch (error) {
        setError("Erreur de chargement des produits");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        setError("Erreur lors de la récupération des produits");
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const existingProduct = allProducts.find((p) => p.id === productId);
        if (existingProduct) {
          setProduct(existingProduct);
        } else {
          try {
            const data = await getProductById(productId);
            setProduct(data);
          } catch (error) {
            console.error("Erreur lors de la récupération du produit :", error);
            setError("Produit introuvable");
          }
        }
      }
    };

    fetchProduct();
  }, [productId, allProducts]);

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const filteredResults = allProducts.filter((product) =>
      product.name.toLowerCase().startsWith(query)
    );

    setSearchResults(filteredResults);
  };

  if (error) {
    return <p>{error}</p>;
  }

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

      {searchResults.length > 0 ? (
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
      ) : (
        searchQuery && <p>Aucun résultat trouvé pour "{searchQuery}"</p>
      )}
    </div>
  );
};

export default Search;