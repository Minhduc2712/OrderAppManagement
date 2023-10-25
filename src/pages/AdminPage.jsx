import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Button } from "@mui/material"; // Import Button from MUI
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddProductAPI,
  actionDeleteProductAPI,
  actionFetchListProductAPI,
} from "../Redux/Reducer/MenuSliceReducer";
import { selectlistProduct } from "../Redux/Selector/ProductSelector";
import ModalCreateNewProduct from "../components/Product/ModalCreateNewProduct";
import { formActions } from "../Redux/Reducer/FormSliceReducer";
import { selectFormStatus } from "../Redux/Selector/FormSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionFetchListCategoryAPI } from "../Redux/Reducer/CategorySliceReducer";

export default function DataTable() {
  const dispatch = useDispatch();
  const { listData: listProduct } = useSelector(selectlistProduct);

  useEffect(() => {
    dispatch(actionFetchListProductAPI());
    dispatch(actionFetchListCategoryAPI());
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
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        const handleDelete = () => {
          dispatch(actionDeleteProductAPI(params.row.id));
        };

        return (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
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
      console.log("Product deleted. Reloading the page...");
      dispatch(actionFetchListProductAPI());
    };

    document.addEventListener("productDeleted", handleProductDeleted);

    return () => {
      document.removeEventListener("productDeleted", handleProductDeleted);
    };
  }, [listProduct]);

  // const { showForm: open } = useSelector(selectFormStatus);
  // console.log("showForm", open);

  const handleAddNewProduct = () => {
    dispatch(formActions.showForm());
  };

  const onHandleClose = () => {
    dispatch(formActions.closeForm());
  };

  const onHandleCreate = (values) => {
    const productNewAPI = {
      country: values.country,
      img: values.img,
      price: values.price,
      rate: values.rate,
      categoryId: values.category,
      name: values.name,
    };
    console.log(productNewAPI);
    dispatch(actionAddProductAPI(productNewAPI));
    dispatch(formActions.closeForm());
  };

  return (
    <Container>
      <div style={{ height: 400, width: "100%" }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddNewProduct}
        >
          Add Product
        </Button>
        <ModalCreateNewProduct
          onHandleClose={onHandleClose}
          onHandleCreate={onHandleCreate}
        />
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
