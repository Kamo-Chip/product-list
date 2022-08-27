import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Footer from "./components/Footer";
import "./styles/styles.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

/**
 * Container for the whole app
 * Handles the logic of routing to the individual pages
 */

const local = "http://localhost/api/index.php";
const on = "https://junior-dev-product-list.000webhostapp.com/index.php";
function App() {
  // Keeps track of the products in the database
  const [products, setProducts] = useState([]);

  // Fetches products from the database
  const fetchProducts = async () => {
    try {
      const response = await fetch(on, {
        method: "GET",
      });
      const productsFromCall = await response.json();

      setProducts(productsFromCall);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetched products the first time the app is loaded
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProductList products={products} fetchProducts={fetchProducts} />
            }
          />
          <Route
            path="add-product"
            element={
              <AddProduct setProducts={setProducts} products={products} />
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
