import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

/**
 * Handles the logic of displaying a product
 */

const ProductList = ({ fetchProducts }) => {
  //Keeps track of which products are selected to be deleted
  const [productsToDelete, setProductsToDelete] = useState([]);

  //Keeps track of the products that are displayed
  const [productList, setProductList] = useState([]);

  const navigate = useNavigate();

  /**
   * Fetches products from the database
   * Updates the products that are displayed
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

      setProductList(productsFromCall);
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

    let indicesToSkip = [];

    // Gets the index of where the products to delete are in the product list array and adds them to indicesToSkip
    productsToDelete.forEach((product) => {
      indicesToSkip.push(productList.indexOf(product));
    });

    /** Adds products to the new product list and skips the index of the products that the user selected to delete
     *  Thereby only adding products that have not been selected to be deleted
     */
    productList.forEach((product, index) => {
      if (!indicesToSkip.includes(index)) {
        updatedList.push(product);
      }
    });

    // Updates the list of products that are displayed on the page
    setProductList(updatedList);

    // Deletes all the products that were selected to be deleted
    for (let product of productsToDelete) {
      await deleteProduct(product);
    }
    window.location.reload();
  };

  /**
   * Fetches products from the database on the first render of the page
   * The reason that there are two states that keep track of products is that one is for the entire app and the other is for the product list page.
   * Having two separate states means that the app does not have to reload when the user deletes a product, thereby creating a fast user experience
   */
  useEffect(() => {
    fetchProducts();
    getProducts();
  }, []);

  // Re-renders the component when the products are updated (deleted, added)
  useEffect(() => {}, [productList]);

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
        {productList.map((product) => (
          <Product
            key={product.sku}
            productDetails={product}
            setListOfProductsToDelete={setProductsToDelete}
            listOfProductsToDelete={productsToDelete}
            listOfProducts={productList}
          />
        ))}
      </main>
    </div>
  );
};

export default ProductList;
