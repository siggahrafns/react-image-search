import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import NothingFound from "./Icons/NothingFound";
import SearchImages from "./Icons/SearchImages";
import Four0FourError from "./Icons/Four0FourError";
import ImageGrid from "./ImageGrid";
import SearchBox from "./SearchBox";
import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState({
    message: "",
    results: [],
    loading: false,
    hasError: false,
  });

  const debounceQuery = useCallback(
    debounce(() => fetchImages(searchValue), 500),
    [searchValue]
  );

  useEffect(() => {
    if (searchValue.length) {
      debounceQuery();
    } else {
      setSearchResults({
        message: "",
        results: [],
        loading: false,
        hasError: false,
      });
    }
  }, [searchValue, debounceQuery]);

  const fetchImages = (query) => {
    const url = `https://content.googleapis.com/customsearch/v1?cx=001361074102112665899%3Ap7mybnrloug&num=8&q=${query}&searchType=image&key=INSERT_KEYHERE`;
    axios
      .get(url)
      .then((res) => {
        const hasItems = res.data.items && res.data.items.length;
        const message = `${
          query.length
            ? `Hmm... Looks like we have no results matching ${query}`
            : ""
        }`;
        setSearchResults({
          message: hasItems ? "" : message,
          results: hasItems ? res.data.items : [],
          loading: false,
          hasError: false,
        });
      })
      .catch((error) => {
        setSearchResults({
          message: "Oh no... Looks like we have a problem!",
          results: [],
          loading: false,
          hasError: true,
        });
      });
  };

  return (
    <>
      <div className={`Header ${searchValue.length ? "small" : ""}`}>
        <div className="headerWrapper">
          <h2>Image Search</h2>
          <SearchBox
            placeholder="Search..."
            searchValue={searchValue}
            searchValueChange={(e) => {
              setSearchValue(e.target.value.trim());
            }}
          />
        </div>
        {searchResults.hasError ? (
          <Four0FourError />
        ) : searchValue.length && !searchResults.results.length ? (
          <NothingFound />
        ) : (
          <SearchImages className="sunna" />
        )}
      </div>
      {searchResults.results && searchResults.results.length ? (
        <ImageGrid searchResults={searchResults.results} />
      ) : searchResults.hasError ? (
        <h3 className="error">
          <strong>{searchResults.message} </strong>
        </h3>
      ) : (
        <h3>{searchResults.message}</h3>
      )}
    </>
  );
}

export default App;
