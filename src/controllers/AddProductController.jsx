import React, { useState, useEffect } from "react";
import AddProduct from "../pages/AddProduct";

function AddProductController() {
  const [products, setProducts] = useState([]);

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
