import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";
import "../styles/search-section.css";
import { useDispatch, useSelector } from "react-redux";
import { selectlistFilteredProduct } from "../Redux/Selector/PaginationSelector";
import { actionFetchPaginationListProductAPI } from "../Redux/Reducer/PaginationSliceReducer";
import queryString from "query-string";
import { SearchResultsList } from "../components/SearchBar/SearchResultList";
import { SearchBar } from "../components/SearchBar/SearchBar";
import SortingDropdown from "../components/SortingBar/SortingDropdown";

const Pizzas = () => {
  const dispatch = useDispatch();
  const { content: product, totalPages } = useSelector(
    selectlistFilteredProduct
  );

  const [filters, setFilters] = useState({
    pageNo: 0,
    pageSize: 8,
    sortBy: "",
    sortDir: "",
  });

  const paginationRef = useRef(null);

  useEffect(() => {
    if (!paginationRef.current) {
      paginationRef.current = true;
    } else {
      const paramsString = queryString.stringify(filters);
      dispatch(actionFetchPaginationListProductAPI(paramsString));
    }
  }, [dispatch, filters]);

  const changePage = ({ selected }) => {
    setFilters({
      ...filters,
      pageNo: selected,
    });
  };

  const handleSort = (sortBySearch, sortDirSearch) => {
    setFilters({
      ...filters,
      sortBy: sortBySearch,
      sortDir: sortDirSearch,
    });
  };

  return (
    <Helmet title="All Pizzas">
      <Container>
        <Row>
          <Col lg="8" md="6" sm="6" xs="12" className="mb-5">
            <div className="search-bar-container">
              <SearchBar />
              <SearchResultsList />
            </div>
          </Col>
          <Col lg="4" md="6" sm="6" xs="12" className="mb-5">
            <SortingDropdown
              className="input-wrapper sorting__widget text-end "
              onSort={handleSort}
            />
          </Col>
        </Row>
        <Row>
          {product.map((item) => (
            <Col
              lg="3"
              md="4"
              sm="6"
              xs="6"
              key={item.id}
              className="mb-4 mt-4"
            >
              <ProductCard item={item} />
            </Col>
          ))}
          <div className="d-flex justify-content-center mt-4 mb-4">
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={changePage}
              previousLabel={"Prev"}
              nextLabel={"Next"}
              containerClassName="paginationBttns"
            />
          </div>
        </Row>
      </Container>
    </Helmet>
  );
};

export default Pizzas;
