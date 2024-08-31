import { useEffect, useState } from "react";
import CreateCmp from "./Components/CreateCmp";
import SearchCmp from "./Components/SearchCmp";
import ReadDataCmp from "./Components/ReadDataCmp";

let defaultobjProduct = {
  title: "",
  price: "",
  taxes: "",
  ads: "",
  discount: "",
  total: 0,
  count: "",
  category: "",
};
let editIndex;

export default function App() {
  const [Products, setProducts] = useState(
    localStorage.UserProducts ? JSON.parse(localStorage.UserProducts) : []
  );
  useEffect(() => {
    localStorage.UserProducts = JSON.stringify(Products);
  }, [Products]);
  const [objProduct, setObjProduct] = useState(defaultobjProduct);
  const [Mood, setMood] = useState("Create");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");


  const CreateEditClick = () => {
    if (objProduct.title && objProduct.price && objProduct.category) {
      if (Mood === "Create") {
        setProducts([...Products, ...Array(objProduct.count || 1).fill(objProduct)]);
      } else {
        const EditProducts = [...Products];
        EditProducts[editIndex] = objProduct;
        setProducts(EditProducts);
        setMood("Create");
        console.log(editIndex);
      }
      setObjProduct(defaultobjProduct);
    } else {
      alert(
        "Please you should enter the title, the price and the category of the product"
      );
    }
  };

  const calculTotal = (updatedObjProduct) => {
    const { price, taxes, ads, discount } = updatedObjProduct;
    setObjProduct({ ...updatedObjProduct, total: price + taxes + ads - discount });
  };

  const handleDeleteItem = (index) => {
    setProducts(Products.filter((_, i) => i !== index));
  };

  const handleEditItem = (index) => {
    editIndex = index;
    setObjProduct(Products[index]);
    setMood("Edit");
  };

  const handleDeleteAllItem = () => {
    setProducts([]);
    setObjProduct(defaultobjProduct);
    setMood("Create");
    setSearch("");
    setSearchBy("");
  };

  const filteredProducts = Products.filter((product) =>
    (searchBy === "Search by Category" ? product.category : product.title).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <CreateCmp
        objProduct={objProduct}
        setObjProduct={setObjProduct}
        Mood={Mood}
        CreateEditClick={CreateEditClick}
        calculTotal={calculTotal}
      />

      {Products.length > 0 && (
        <>
          <SearchCmp
            search={search}
            setSearch={setSearch}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
          />
          <button onClick={handleDeleteAllItem}>
            Delete All ( {Products.length} )
          </button>
        </>
      )}

      <ReadDataCmp
        Products={filteredProducts}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
      />
    </section>
  );
}
