import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

/**
 * Handles the logic of displaying a product
 */

const ProductList = ({ products, fetchProducts }) => {
  //Keeps track of which products are selected to be deleted
  const [productsToDelete, setProductsToDelete] = useState([]);
  const [p, setP] = useState([]);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://productlist-jr.herokuapp.com/index.php",
        {
          method: "GET",
        }
      );

      const productsFromCall = await response.json();
      setP(productsFromCall);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Deletes a specified product from the database
   */
  const deleteProduct = async (element) => {
    try {
      await fetch("https://productlist-jr.herokuapp.com/index.php", {
        method: "DELETE",
        body: JSON.stringify(element),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Deletes all the products that are selected to be deleted
   */
  const deleteSelectedProducts = async () => {
    let updatedList = [];

    let indices = [];

    productsToDelete.forEach((product) => {
      indices.push(p.indexOf(product));
    });

    p.forEach((product, index) => {
      if (!indices.includes(index)) {
        updatedList.push(product);
      }
    });

    setP(updatedList);

    for (let product of productsToDelete) {
      await deleteProduct(product);
    }
    window.location.reload();
  };

  // Fetches products on the first render of the page
  useEffect(() => {
    fetchProducts();
    getProducts();
  }, []);

  return (
    <div className="productlist">
      <div className="header">
        <h1>Product List</h1>
        <div className="header-btn-container">
          <button onClick={() => navigate("/add-product")}>ADD</button>
          <button id="delete-product-btn" onClick={deleteSelectedProducts}>
            MASS DELETE
          </button>
        </div>
      </div>
      <main>
        {p.map((product) => (
          <Product
            key={product.sku}
            productDetails={product}
            setListOfProductsToDelete={setProductsToDelete}
            listOfProductsToDelete={productsToDelete}
            listOfProducts={products}
          />
        ))}
      </main>
    </div>
  );
};

export default ProductList;
