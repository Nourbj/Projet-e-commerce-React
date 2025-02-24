import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../Services/Categorie"; 
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

const Navigation = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Données de catégories invalides :", data);
          setCategories([]); 
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand">
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              {categories.length > 0 && 
                categories.map((category) => (
                  <li key={category.id}>
                    {/* Vérification de category.name avant de faire toLowerCase */}
                    <Link to={`/Shop/${category.name ? category.name.toLowerCase() : 'unknown'}`}>
                      {category.name ? category.name : 'Catégorie inconnue'}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
