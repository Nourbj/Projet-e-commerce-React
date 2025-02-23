import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { getCategories } from "../Services/Categorie";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import Newsletter from "./Newsletter";
import MyStore from "./MyStore";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="footer-top-area">
      <div className="zigzag-bottom"></div>
      <div className="container">
        <div className="row">
          <MyStore />

          <div className="col-md-4 col-sm-6">
            <div className="footer-menu">
              <h2 className="footer-wid-title">Categories</h2>
              {categories.length > 0 && (
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link to={`/Shop/${category.name.toLowerCase()}`}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Footer;
