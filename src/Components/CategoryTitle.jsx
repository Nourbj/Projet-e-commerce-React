import '../assets/css/font-awesome.min.css'
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const CategoryTitle = ({ categoryTitle }) => {
  return (
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
  );
};

export default CategoryTitle;
