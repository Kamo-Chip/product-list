import React, { useState, useEffect } from "react";
import ProductList from "../pages/ProductList";

/**
 * Handles communication with backend
 * Passes data to ProductList components
 */
function ProductListController() {
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

      let productsFromCall = await response.json();
      setProducts(productsFromCall);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Deletes the product passed in as a parameter
   */
  const deleteProduct = async (product) => {
    try {
      await fetch("https://productlist-jr.herokuapp.com/index.php", {
        method: "DELETE",
        body: JSON.stringify(product),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductList
      products={products}
      deleteProduct={deleteProduct}
      setProducts={setProducts}
    />
  );
}

export default ProductListController;
