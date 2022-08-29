/**
 * Displays the extended form for when book is selected in the type switcher
 * Uses handleChange method defined in the AddProduct component to update the state of the product's details
 */

const BookExtendedForm = ({ handleChange }) => {
  return (
    <>
      <section>
        <label htmlFor="weight">Weight {"(KG)"}</label>
        <input
          type="number"
          id="weight"
          name="weight"
          className="attribute-value"
          onChange={handleChange}
        ></input>
      </section>
      <div>*Please provide the weight (in KG) of the book</div>
    </>
  );
};

export default BookExtendedForm;
