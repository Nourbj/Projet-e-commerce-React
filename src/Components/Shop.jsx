import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const Shop = () => {
  const { category } = useParams();
  const [categoryTitle, setCategoryTitle] = useState('');

  useEffect(() => {
    console.log('Category:', category); // Debugging statement
    if (category) {
      setCategoryTitle(category.charAt(0).toUpperCase() + category.slice(1)); 
    } else {
      setCategoryTitle('All Products');
    }
  }, [category]);

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
    </div>
  );
};

export default Shop;
