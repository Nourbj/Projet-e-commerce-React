import React from "react";
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const Navigation = () => {
  return (
    <div className="mainmenu-area">
      <div className="container">
        <div className="row">
          <div className="navbar">
            <ul className="nav navbar-nav navbar-expand">
              <li className="active"><a href="index.html">Home</a></li>
              <li><a href="#">Samsung</a></li>
              <li><a href="#">Apple</a></li>
              <li><a href="#">LG</a></li>
              <li><a href="#">Sony</a></li>
              <li><a href="#">Huawei</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="slider-area">
        <div className="block-slider block-slider4">
          {/* Add slider content here */}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
