/**
 * Displays the extended form for when dvd is selected in the type switcher
 * Uses handleChange method defined in the AddProduct component to update the state of the product's details
 */

const DVDExtendedForm = ({ handleChange }) => {
  return (
    <>
      <section>
        <label htmlFor="size">Size</label>
        <input
          type="number"
          name="size"
          id="size"
          className="attribute-value"
          onChange={handleChange}
        ></input>
      </section>
      <div>*Please provide the storage capacity (in MB) of the DVD</div>
    </>
  );
};

export default DVDExtendedForm;
