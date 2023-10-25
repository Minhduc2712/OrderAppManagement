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
    <div className="input-wrapper search__widget d-flex align-items-center justify-content-between ">
      <input
        type="text"
        placeholder="I'm looking for...."
        value={input}
        onChange={(e) => {
          handleChange(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />
      <span>
        <i class="ri-search-line"></i>
      </span>
    </div>
  );
};
