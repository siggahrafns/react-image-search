import React, { useState } from "react";
import "./SearchBox.css";
import { SearchIcon, CloseIcon } from "./Icons/MaterialIcons";

function SearchBox({ placeholder, searchValueChange }) {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e) => {
    if (e.key !== "Backspace" && e.key !== "Delete") {
      searchValueChange(searchValue);
    }
  };

  return (
    <div className="inputWrapper">
      <input
        className="searchInput"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onKeyUp={(event) => {
          handleSearchChange(event);
        }}
        onChange={(event) => setSearchValue(event.target.value.trim())}
      />
      <SearchIcon />
      <button
        style={
          searchValue.length
            ? { visibility: "visible", opacity: 1 }
            : { visibility: "hidden", opacity: 0 }
        }
        className="clearButton"
        onClick={() => {
          setSearchValue("");
          searchValueChange("");
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export default SearchBox;
