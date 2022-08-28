import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

/**
 * Handles the logic of displaying a product
 */

const ProductList = () => {
  //Keeps track of which products are selected to be deleted
  const [productsToDelete, setProductsToDelete] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://productlist-jr.herokuapp.com/index.php", {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const productsFromCall = await response.json();

      setProducts(productsFromCall);
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
    productsToDelete.forEach((product) => {
      deleteProduct(product);
    });

    /**
     * Refreshes page after deleting products. This is done inorder to fetch updated list of products from database
     * Waits 0.1 seconds before refreshing to enable the request to the php api to run to completion
     * Async function is not used here as it requires an unnecessary overhead
     */
    await fetchProducts();
    // console.log(productsToDelete)
  };

  // Fetches products on the first render of the page
  useEffect(() => {
    fetchProducts();
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
        {products.map((product) => (
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
