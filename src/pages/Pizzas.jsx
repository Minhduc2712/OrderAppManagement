import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";
import "../styles/search-section.css";
import { useDispatch, useSelector } from "react-redux";
import { selectlistProduct } from "../Redux/Selector/ProductSelector";
import { actionFetchListProductAPI } from "../Redux/Reducer/MenuSliceReducer";
import { selectlistFilteredProduct } from "../Redux/Selector/PaginationSelector";
import { actionFetchPaginationListProductAPI } from "../Redux/Reducer/PaginationSliceReducer";
import queryString from "query-string";
import $ from "jquery";
import { SearchResultsList } from "../components/SearchBar/SearchResultList";
import { SearchBar } from "../components/SearchBar/SearchBar";
import SortingDropdown from "../components/SortingBar/SortingDropdown";

const Pizzas = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();
  const stateRedux = useSelector((state) => state);
  const {
    data: searchedProduct,
    status,
    error,
  } = useSelector(selectlistProduct);
  const {
    content: product,
    pageNo,
    pageSize,
    totalElements,
    totalPages,
  } = useSelector(selectlistFilteredProduct);

  const [filters, setFilters] = useState({
    pageNo,
    pageSize,
    sortBy: "name",
    sortDir: "asc",
  });

  const paginationRef = useRef(null);

  useEffect(() => {
    if (!paginationRef.current) {
      paginationRef.current = true;

      $(".paginationBttns a:nth-child(2)").addClass("active");
    } else {
      const paramsString = queryString.stringify(filters);
      console.log(paramsString);
      dispatch(actionFetchListProductAPI());
      dispatch(actionFetchPaginationListProductAPI(`${paramsString}`));
    }
  }, [dispatch, filters]);

  $(document).ready(function () {
    $(".paginationBttns a").click(function () {
      $(".paginationBttns a").removeClass("active");
      $(this).addClass("active");
    });
  });

  const changePage = ({ selected }) => {
    setFilters({
      ...filters,
      pageNo: selected,
    });
  };

  const handleSort = (sortBySearch, sortDirSearch) => {
    console.log(sortBySearch);
    console.log(sortDirSearch);
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
          <div className="search-bar-container">
            <SearchBar />
            <SearchResultsList />
          </div>
        </Row>
        <Row>
          <Col></Col>
          {/* <Col></Col> */}
          <Col>
            <SortingDropdown onSort={handleSort} />
          </Col>
          {/* <Col></Col> */}
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
