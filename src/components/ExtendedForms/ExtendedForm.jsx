import React from "react";
import BookExtendedForm from "./BookExtendedForm";
import DVDExtendedForm from "./DVDExtendedForm";
import FurnitureExtendedForm from "./FurnitureExtendedForm";
import EmptyExtendedForm from "./EmptyExtendedForm";

/**
 * Forms are linked to the product type selected using an object
 * This is done to be able to dynamically render the required form without the use of if statements
 * When new product type is created simply add a new key-value pair to the components object
 * E.g) When a bottle product type is created you would create the necessary form then add it to the components object like:
 *     Bottle: BottleExtendedForm 
 */
const components = {
  Book: BookExtendedForm,
  DVD: DVDExtendedForm,
  Furniture: FurnitureExtendedForm,
  "": EmptyExtendedForm, //This forms returns when the type switcher value is the default (before user has selected product)
};

/**
 * Handles the logic of displaying the required form based on the product that the user selects using the type switcher
 * Gets the productType prop, and handleChange method from the AddProduct component
 */

const ExtendedForm = ({ productType, handleChange }) => {
  const SpecificExtendedForm = components[productType]; //Dynamically sets the specific form to be rendered

  return (
    <SpecificExtendedForm
      handleChange={handleChange}
    />
  );
};

export default ExtendedForm;