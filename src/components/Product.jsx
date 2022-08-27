/**
 * Component for an individual product item
 * Handles the logic for displaying a product
 */

const Product = ({
  productDetails,
  setListOfProductsToDelete,
  listOfProductsToDelete,
  listOfProducts,
}) => {
  const { sku, name, price, attribute, attribute_value } = productDetails;

  // Returns the appropriate unit of measurement depending on what the attribute of the product is
  //E.g attribute of "Size" will return "MB"
  const getMeasurement = () => {
    return attribute === "Size" ? "MB" : attribute === "Weight" ? "KG" : "";
  };

  /**
   * Handles the logic for deleting a product
   * The selected product is displayed for deletion
   * The parameter "e" is the checkbox that was clicked
   * Each checkbox has an id corresponding to the product the checkbox is linked to
   */

  const selectProductToDelete = (e) => {
    const { checked, id } = e.target;
    let productToDelete;

    /**
     * Checks which product the user selected to delete by comparing the skus of the products in the database with the id of the checkbox (sku of product to delete)
     */
    listOfProducts.forEach((product) => {
      if (product.sku == id) {
        productToDelete = product;
      }
    });

    /**
     * If the checkbox is checked and the list of products to delete does not include the selected product
     *  - Add the selected product to the list of products to delete
     * Else if the checkbox is unchecked and the list of products to delete includes the unselected product
     *  - Remove the unselected product from the list of products to delete
     */
    if (checked && !listOfProductsToDelete.includes(productToDelete)) {
      setListOfProductsToDelete([...listOfProductsToDelete, productToDelete]);
    } else if (!checked && listOfProductsToDelete.includes(productToDelete)) {
      let updatedListOfProductsToDelete = [];
      listOfProductsToDelete.forEach((product) => {
        if (product.sku != productToDelete.sku) {
          updatedListOfProductsToDelete.push(product);
        }
      });
      setListOfProductsToDelete(updatedListOfProductsToDelete);
    }
  };

  return (
    <div className="product">
      <input
        type="checkbox"
        className="delete-checkbox"
        id={sku}
        onClick={selectProductToDelete}
      />
      <div>
        <span>{sku}</span>
        <span>{name}</span>
        <span>{((Number)(price)).toFixed(2)} $</span>
        <span>
          {attribute}: {attribute_value} {getMeasurement()}
        </span>
      </div>
    </div>
  );
};

export default Product;
