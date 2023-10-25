import React from "react";
import { useSelector } from "react-redux";
import { selectlistSearchedProduct } from "../../Redux/Selector/ProductSelector";
import { Link } from "react-router-dom";
import "./SearchResultList.css";
import { Searchresult } from "./Searchresult.1";

export const SearchResultsList = () => {
  const { data } = useSelector(selectlistSearchedProduct);

  if (!data) {
    return <div>No search results found.</div>;
  }

  return (
    <div className="results-list">
      {data.map((result, id) => (
        <Link to={`/product/${result.id}`} key={id}>
          <Searchresult result={result.name} />
        </Link>
      ))}
    </div>
  );
};
