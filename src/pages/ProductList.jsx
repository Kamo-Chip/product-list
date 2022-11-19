import React, { useState } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

/**
 * Handles the logic of displaying a product
 */

const ProductList = ({ products, deleteProduct, setProducts }) => {
  //Keeps track of which products are selected to be deleted
  const [productsToDelete, setProductsToDelete] = useState([]);

  const navigate = useNavigate();

  const deleteSelectedProducts = async () => {
    let updatedList = [];

    let indicesToSkip = [];

    // Gets the index of where the products to delete are in the product list array and adds them to indicesToSkip
    productsToDelete.forEach((product) => {
      indicesToSkip.push(products.indexOf(product));
    });

    /** Adds products to the new product list and skips the index of the products that the user selected to delete
     *  Thereby only adding products that have not been selected to be deleted
     */
    products.forEach((product, index) => {
      if (!indicesToSkip.includes(index)) {
        updatedList.push(product);
      }
    });

    // Updates the list of products that are displayed on the page
    setProducts(updatedList);

    // Deletes all the products that were selected to be deleted
    for (let product of productsToDelete) {
      await deleteProduct(product);
    }
    window.location.reload();
  };

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
            products={products}
          />
        ))}
      </main>
    </div>
  );
};

export default ProductList;
