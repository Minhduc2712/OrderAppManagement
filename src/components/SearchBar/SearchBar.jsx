import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash/debounce";

import "./SearchBar.css";
import { actionFetchSearchedProductAPI } from "../../Redux/Reducer/MenuSliceReducer";
import { useDispatch } from "react-redux";

export const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const debouncedSearch = debounce((value) => {
    if (value.trim() === "") {
      dispatch(actionFetchSearchedProductAPI(null));
    } else {
      dispatch(actionFetchSearchedProductAPI(value));
    }
  }, 500);

  const handleChange = (value) => {
    setInput(value);
    debouncedSearch(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        style={{ margin: "20px" }}
        placeholder="Type to search..."
        value={input}
        onChange={(e) => {
          handleChange(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />
    </div>
  );
};
