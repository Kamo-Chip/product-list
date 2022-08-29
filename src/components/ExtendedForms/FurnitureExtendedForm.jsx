/**
 * Displays the extended form for when furniture is selected in the type switcher
 * Uses handleChange method defined in the AddProduct component to update the state of the product's details
 */

const FurnitureExtendedForm = ({ handleChange }) => {
  return (
    <div>
      <section>
        <label htmlFor="height">Height {"(CM)"}</label>
        <input
          type="number"
          id="height"
          name="height"
          className="attribute-value"
          onChange={handleChange}
        ></input>
      </section>
      <section>
        <label htmlFor="width">Width {"(CM)"}</label>
        <input
          type="number"
          id="width"
          name="width"
          className="attribute-value"
          onChange={handleChange}
        ></input>
      </section>
      <section>
        <label htmlFor="length">Length {"(CM)"}</label>
        <input
          type="number"
          id="length"
          name="length"
          className="attribute-value"
          onChange={handleChange}
        ></input>
      </section>
      <div>
        *Please provide the dimensions {"(in CM)"} of the furniture piece in H x
        W x L format
      </div>
    </div>
  );
};

export default FurnitureExtendedForm;
