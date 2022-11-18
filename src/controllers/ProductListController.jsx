import React, { useState, useEffect } from "react";
import ProductList from "../pages/ProductList";

function ProductListController() {
  const [products, setProducts] = useState([]);

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
    <ProductList products = {products} deleteProduct = {deleteProduct} setProducts={setProducts}/>
  )
}

export default ProductListController;
