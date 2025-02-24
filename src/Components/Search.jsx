import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/style.css";

const API_BASE_URL = "http://localhost:3000";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const { category = "all" } = useParams();
  const { productId } = useParams();

  const [error, setError] = useState("");

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
    if (category === "all") {
      return;
    }

    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    setSearchResults(filteredProducts);
  }, [category, allProducts]);

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

  if (productId) {
    const product = allProducts.find((p) => p.id === productId);
    if (!product) {
      return <p>Chargement du produit...</p>;
    }
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
