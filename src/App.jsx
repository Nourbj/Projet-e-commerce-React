import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetails from "./Pages/FicheProduit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/:category" element={<Shop />} />
          <Route path="/Shop/:category" element={<Shop />} />
          <Route path="/Shop/:category/ProductDetails/:id" element={<ProductDetails />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
