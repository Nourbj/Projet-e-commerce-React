import { NavLink, useParams } from "react-router-dom";
function FileAriane({categoryName , product}){
  const { category } = useParams(); 

    return (
        <div className="product-breadcroumb">
        <NavLink to="/">
                  Home
                </NavLink>
                <NavLink to={`/Shop/${category}`}>Back to {category}</NavLink>

      </div>
    )
}
export default FileAriane; 











