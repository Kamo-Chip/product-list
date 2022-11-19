import { useState, useEffect } from "react";
import AddProduct from "../pages/AddProduct";

/**
 * Handles communication with backend
 * Passes data to AddProduct component
 */
function AddProductController() {
  const [products, setProducts] = useState([]); //Stores the products in the database

  /**
   * Fetches products from the database and updates the state
   */
  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://productlist-jr.herokuapp.com/index.php",
        {
          method: "GET",
        }
      );

      const productsFromCall = await response.json();
      setProducts(productsFromCall);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AddProduct products={products}/>
  )
}

export default AddProductController;