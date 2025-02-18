import React from "react";
import logo from '../assets/img/logo.png';

 
const Logo = () => {
    return (
      <div className="row align-items-center">
        <div className="col-sm-8">
          <div className="logo">
            <h1>
              <a href="/">
                <img src={logo} alt="Logo" />
              </a>
            </h1>
          </div>
        </div>
      </div>
    );
  };
  
 
export default Logo;