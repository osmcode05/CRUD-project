export default function CreateCmp({ objProduct, setObjProduct, Mood, CreateEditClick, calculTotal }) {

  const handleChange = (key, value) => {
    if (["price", "taxes", "ads", "discount"].includes(key)) {
      calculTotal({ ...objProduct, [key]: +value });
    } else {
      setObjProduct({ ...objProduct, [key]: key === "count" ? +value : value });
    }
  };

  const renderInput = (type, key, placeholder) => (
    <input
      type={type}
      value={objProduct[key]}
      onChange={(e) => handleChange(key, e.target.value)}
      placeholder={placeholder}
      maxLength={20}
    />
  );

  return (
    <div className="inputs">
      {renderInput("text", "title", "Title")}
      <div className="row_input">
        {renderInput("number", "price", "Price")}
        {renderInput("number", "taxes", "Taxes")}
        {renderInput("number", "ads", "Ads")}
        {renderInput("number", "discount", "Discount")}
        <div
          style={{ backgroundColor: objProduct.total > 0 ? "green" : "red" }}
          id="total"
        >
          Total: {objProduct.total}
        </div>
      </div>
      {Mood === "Create" && renderInput("number", "count", "Count")}
      {renderInput("text", "category", "Category")}
      <button onClick={CreateEditClick}>{Mood}</button>
    </div>
  );
}
