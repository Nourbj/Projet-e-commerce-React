import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/Produit";
import "../assets/css/font-awesome.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import OtherBrand from "../Components/OtherBrand";
import ProductDescription from "../Components/ProductDescription";
import FileAriane from "../Components/FileAriane";

const FicheProduit = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
      const productData = await getProductById(productId);
      setProduct(productData);
  };
  const { category, id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Chargement du produit...</p>;
  }

  return (
    <div className="single-product-area">
    <div className="zigzag-bottom" />
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="single-sidebar">
            <h2 className="sidebar-title">Recently Viewed</h2>
            <div className="thubmnail-recent">
              <img
                src="img/product-thumb-1.jpg"
                className="recent-thumb"
                alt=""
              />
              <h2>
                <a href="">Sony Smart TV - 2015</a>
              </h2>
              <div className="product-sidebar-price">
                <ins>700.00 € </ins> <del>100.00 €</del>
              </div>
            </div>
            <div className="thubmnail-recent">
              <img
                src="img/product-thumb-1.jpg"
                className="recent-thumb"
                alt=""
              />
              <h2>
                <a href="">Sony Smart TV - 2015</a>
              </h2>
              <div className="product-sidebar-price">
                <ins>$700.00</ins> <del>$100.00</del>
              </div>
            </div>
            <div className="thubmnail-recent">
              <img
                src="img/product-thumb-1.jpg"
                className="recent-thumb"
                alt=""
              />
              <h2>
                <a href="">Sony Smart TV - 2015</a>
              </h2>
              <div className="product-sidebar-price">
                <ins>$700.00</ins> <del>$100.00</del>
              </div>
            </div>
            <div className="thubmnail-recent">
              <img
                src="img/product-thumb-1.jpg"
                className="recent-thumb"
                alt=""
              />
              <h2>
                <a href="">Sony Smart TV - 2015</a>
              </h2>
              <div className="product-sidebar-price">
                <ins>$700.00</ins> <del>$100.00</del>
              </div>
            </div>
          </div>
            <OtherBrand />
          </div>
          <div className="col-md-8">
            <div className="product-content-right">
              <FileAriane />
              <div className="row">
                    <div className="col-sm-6">
                        <div className="product-images">
                            <div className="product-main-img">
                                
                                <img src={`/img/produts-img/${category}/${product.imageName}`}   alt={product.name} />
                            </div>
                            <div className="product-gallery">
                                        <img src="/img/product-thumb-1.jpg" alt=""/>
                                        <img src="/img/product-thumb-2.jpg" alt=""/>
                                        <img src="/img/product-thumb-3.jpg" alt=""/>
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
                      <button className="add_to_cart_button" type="submit">
                        Add to cart
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
