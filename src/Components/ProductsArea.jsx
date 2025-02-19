import ProductWidget from './ProductWidget.jsx';

function ProductsArea() {
  return (
    <div className="product-widget-area">
      <div className="zigzag-bottom" />
      <div className="container">
        <div className="row">
          <ProductWidget 
            title="Top Sellers" 
            apiUrl="http://localhost:3000/top-sellers-products" 
          />

          <ProductWidget 
            title="Recently Viewed" 
            apiUrl="http://localhost:3000/recently-viewed-products" 
          />

          <ProductWidget 
            title="Top New" 
            apiUrl="http://localhost:3000/top-new-products" 
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsArea;
