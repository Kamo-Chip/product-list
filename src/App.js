import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductController from "./controllers/AddProductController";
import Footer from "./components/Footer";
import "./styles/styles.css";
import ProductListController from "./controllers/ProductListController";

/**
 * Container for the whole app
 * Handles the logic of routing to the individual pages
 */

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProductListController/>
            }
          />
          <Route
            path="add-product"
            element={
              <AddProductController/>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;