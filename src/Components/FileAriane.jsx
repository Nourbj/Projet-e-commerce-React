import { NavLink } from "react-router-dom";
function FileAriane({categoryName , product}){
    return (
        <div className="product-breadcroumb">
        <NavLink to="/">
                  Home
                </NavLink>
                <NavLink to={`/Shop/${categoryName}`}>Category Name</NavLink>

      </div>
    )
}
export default FileAriane; 