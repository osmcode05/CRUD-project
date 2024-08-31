import { useRef } from "react";

export default function SearchCmp({ search, setSearch, setSearchBy, searchBy }) {
  const inpRef = useRef(null);

  const handleToSearchBy = (label) => {
    inpRef.current.focus();
    setSearchBy(`Search by ${label}`);
  };

  return (
    <div>
      <input
        ref={inpRef}
        type="text"
        placeholder={searchBy || "Search"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row_btn">
        <button onClick={() => handleToSearchBy("Title")}>Search by Title</button>
        <button onClick={() => handleToSearchBy("Category")}>Search by Category</button>
      </div>
    </div>
  );
}
