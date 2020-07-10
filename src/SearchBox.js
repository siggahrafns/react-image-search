import React from "react";
import "./App.css";
import { SearchIcon } from "./Icons/MaterialIcons";

function SearchBox({ placeholder, searchValue, searchValueChange }) {
  return (
    <div className="inputWrapper">
      <input
        className="searchInput"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(event) => searchValueChange(event)}
      />
      <SearchIcon />
    </div>
  );
}

export default SearchBox;
