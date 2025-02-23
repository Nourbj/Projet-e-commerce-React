import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Actions"; 
import { selectCart } from "../Redux/Store";
import { getProductById } from "../Services/Produit";
import "../assets/css/font-awesome.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import OtherBrand from "../Components/OtherBrand";
import ProductDescription from "../Components/ProductDescription";
import FileAriane from "../Components/FileAriane";
import ProductWidget from "../Components/ProductWidget";

const FicheProduit = () => {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart); 
  const navigate = useNavigate(); 

  const handleAddToCart = () => {
    if (product) {
      const { id, name, price, imageName } = product;
      const productToAdd = { id, name, price, imageName };
      dispatch(addToCart(productToAdd, 1));  
      
      navigate("/cart");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="single-product-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="single-sidebar">
              <h2 className="sidebar-title">Recently Viewed</h2>
              <ProductWidget title="Recently Viewed" showViewAllButton={false} showTitle={false} />
              <OtherBrand />
            </div>
          </div>
          <div className="col-md-8">
            <div className="product-content-right">
              <FileAriane />
              <div className="row">
                <div className="col-sm-6">
                  <div className="product-images">
                    <div className="product-main-img">
                      <img
                        src={`/img/produts-img/${category || "default"}/${product.imageName}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="product-gallery">
                      <img src="/img/product-thumb-1.jpg" alt="" />
                      <img src="/img/product-thumb-2.jpg" alt="" />
                      <img src="/img/product-thumb-3.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="product-inner">
                    <h2 className="product-name">{product.name}</h2>
                    <div className="product-inner-price">
                      <ins>{product.price} €</ins>
                      {product.oldPrice && <del>{product.oldPrice} €</del>}
                    </div>
                    <form className="cart">
                      <div className="quantity">
                        <input
                          type="number"
                          className="input-text qty text"
                          title="Qty"
                          defaultValue={1}
                          name="quantity"
                          min={1}
                          step={1}
                        />
                      </div>
                      <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add to Cart
                      </button>
                    </form>
                    <ProductDescription description={product.description} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheProduit;
