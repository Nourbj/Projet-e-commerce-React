import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import { Link } from 'react-router-dom';
import  { useState, useEffect } from 'react';

const Navigation = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
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
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/Shop/${category.name.toLowerCase()}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};


export default Navigation;
