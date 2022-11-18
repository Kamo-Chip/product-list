import React, { useState } from "react";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

/**
 * Handles the logic of displaying a product
 */

const ProductList = ({ products, deleteProduct }) => {
  //Keeps track of which products are selected to be deleted
  const [productsToDelete, setProductsToDelete] = useState([]);

  const navigate = useNavigate();

  /**
   * Deletes all the products that are selected to be deleted
   */
  const deleteSelectedProducts = async () => {
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
