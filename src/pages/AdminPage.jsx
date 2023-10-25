import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Button } from "@mui/material"; // Import Button from MUI
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionDeleteProductAPI,
  actionFetchListProductAPI,
} from "../Redux/Reducer/MenuSliceReducer";
import { selectlistProduct } from "../Redux/Selector/ProductSelector";

export default function DataTable() {
  const dispatch = useDispatch();
  const { listData: listProduct } = useSelector(selectlistProduct);

  useEffect(() => {
    dispatch(actionFetchListProductAPI());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "country", headerName: "Country", width: 130 },
    {
      field: "img",
      headerName: "Image",
      width: 90,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
    },
    {
      field: "rate",
      headerName: "Rate",
      sortable: true,
      width: 90,
    },
    {
      field: "categoryName",
      headerName: "CategoryName",
      type: "string",
      width: 90,
    },
    // Add a custom column for buttons
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        const handleDelete = () => {
          // Dispatch the action to delete the product
          dispatch(actionDeleteProductAPI(params.row.id));
        };

        return (
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        );
      },
    },
  ];

  const rows = listProduct.map((product) => ({
    id: product.id,
    name: product.name,
    country: product.country,
    img: product.img,
    price: product.price,
    rate: product.rate,
    categoryName: product.categoryName,
  }));

  useEffect(() => {
    const handleProductDeleted = () => {
      // Implement your logic to handle product deleted
      console.log("Product deleted. Reloading the page...");
      dispatch(actionFetchListProductAPI());
    };

    // Listen to the "productDeleted" event
    document.addEventListener("productDeleted", handleProductDeleted);

    return () => {
      // Clean up the event listener
      document.removeEventListener("productDeleted", handleProductDeleted);
    };
  }, [listProduct]);

  return (
    <Container>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}
