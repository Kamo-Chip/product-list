import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExtendedForm from "../components/ExtendedForms/ExtendedForm";

/**
 * Handles the logic of adding a product
 */
const AddProduct = ({ products }) => {
  //Stores the product's details
  const [productDetails, setProductDetails] = useState({
    sku: "",
    name: "",
    price: 0,
    productType: "",
    attributeValue: "",
  });

  const navigate = useNavigate();

  /**
   * Sets the attributeValue of the productDetails object
   * The input fields that take the attribute value have a class "attribute-value"
   * Gets an array of the input fields that take the attribute value
   * If the length is greater than 1, then the attribute value consists of multiple values
   * Length would be greater than 1 for instance when the user is inputting data for furniture as it has a height, width, and length
   *  - attributeInputArr would be NodeList(3) [input#height.attribute-value, input#width.attribute-value, input#length.attribute-value]
   * Whereas length would be equal to 1 for instance when the user is inputting data for a DVD as it only has one value - size
   * - attributeInputArr would be NodeList [input#size.attribute-value]
   */
  const setAttributeValue = () => {
    const attributeInputArr = document.querySelectorAll(".attribute-value");
    let attributeValueString = "";

    if (attributeInputArr.length > 1) {
      attributeInputArr.forEach((element) => {
        attributeValueString += element.value + "x"; //Formats the way the values are by using "x" as a delimeter stored (HxWxL).
      });
      attributeValueString = attributeValueString.slice(0, -1); //Removes the last "x" in the string
    } else {
      attributeValueString = attributeInputArr[0].value;
    }
    setProductDetails({
      ...productDetails,
      attributeValue: attributeValueString,
    });
  };

  /**
   * Updates the state (productDetails) of the relevant value when data is inputted in the form
   */
  const handleChange = (e) => {
    if (e.target.className === "attribute-value") {
      setAttributeValue();
    } else {
      setProductDetails({ ...productDetails, [e.target.id]: e.target.value });
    }
  };

  /**
   * Handles input validation
   * There is no need to implement type validation as input types are specified on the input elements which have their own built in type validation
   */
  const isValid = () => {
    let error = "";
    let isValid = false;

    //Checks if product with the given sku value already exists
    products.forEach((product) => {
      if (product.sku === productDetails.sku) {
        error = "Product with given sku already exists";
      }
    });

    //Checks if any values are empty
    for (let detail in productDetails) {
      if (!productDetails[detail]) {
        error = "Please submit required data";
      }
    }

    if (error) {
      window.alert(error);
    } else {
      isValid = true;
    }

    return isValid;
  };

  //Adds the product to the database
  const submitProduct = async () => {
    try {
      await fetch("https://productlist-jr.herokuapp.com/index.php", {
        method: "post",
        body: JSON.stringify(productDetails),
        mode: "no-cors",
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  //Submits the product if the data is valid
  const handleSubmit = () => {
    if (isValid()) {
      submitProduct();
    }
  };

  //Re-renders component when the productType changes. This is done to dynamically change the form
  useEffect(() => {}, [productDetails.productType]);

  return (
    <div className="add-product">
      <div className="header">
        <h1>Product Add</h1>
        <div className="header-btn-container">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
      <main>
        <form id="product_form">
          <section>
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              onChange={handleChange}
            ></input>
          </section>
          <section>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
            ></input>
          </section>
          <section>
            <label htmlFor="price">Price {"($)"}</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              step="0.01"
            ></input>
          </section>
          <section>
            <label htmlFor="productType">Type Switcher</label>
            <select
              id="productType"
              name="productType"
              onChange={handleChange}
              defaultValue="none"
            >
              <option value="none" disabled hidden>
                Type Switcher
              </option>
              <option value="DVD" id="DVD">
                DVD-disc
              </option>
              <option value="Furniture" id="Furniture">
                Furniture
              </option>
              <option value="Book" id="Book">
                Book
              </option>
            </select>
          </section>
          {/*Dynamically renders the appropraite extended form based on the product picked by the user */}
          <ExtendedForm
            productType={productDetails.productType}
            handleChange={handleChange}
          />
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
