import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddProductAPI,
  actionDeleteProductAPI,
  actionFetchListProductAPI,
  actionFetchProductById,
} from "../Redux/Reducer/MenuSliceReducer";
import { selectlistProduct } from "../Redux/Selector/ProductSelector";
import ModalCreateNewProduct from "../components/Product/ModalCreateNewProduct";
import { formActions } from "../Redux/Reducer/FormSliceReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteProductFromCart,
  getProductCartsByUserId,
} from "../store/shopping-cart/cartSliceReducer";
import { selectlistProductCart } from "../store/shopping-cart/cartSelector";
import Cookies from "js-cookie";
import { actionFetchListCategoryAPI } from "../Redux/Reducer/CategorySliceReducer";
import withAdminPermission from "../components/HOC/withAdminPermission";

function AdminPage() {
  const dispatch = useDispatch();
  const { listData: listProduct } = useSelector(selectlistProduct);
  const { data: cartProducts } = useSelector(selectlistProductCart);
  const tokenString = Cookies.get("userPayload");
  let userId;
  if (tokenString) {
    const token = JSON.parse(tokenString);
    userId = token.userId;
  }

  useEffect(() => {
    dispatch(actionFetchListCategoryAPI());
    dispatch(actionFetchListProductAPI());
  }, [dispatch, userId]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "country", headerName: "Country", width: 130 },
    {
      field: "img",
      headerName: "Image",
      width: 180,
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
      width: 120,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        const handleDelete = () => {
          if (cartProducts) {
            const productToDelete = cartProducts.find(
              (product) => product.id === params.row.id
            );

            if (productToDelete) {
              const formValuesDB = { cartId: productToDelete.id, userId };
              dispatch(actionDeleteProductAPI(params.row.id));
              dispatch(deleteProductFromCart(formValuesDB));
              dispatch(getProductCartsByUserId(userId));
            }
          } else {
            dispatch(actionDeleteProductAPI(params.row.id));
          }
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
    {
      field: "update",
      headerName: "Update",
      width: 120,
      renderCell: (params) => {
        const handleEditProduct = () => {
          dispatch(formActions.showFormEdit());
          onHandleEdit(params.row.id);
        };
        return (
          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            onClick={handleEditProduct}
          >
            Edit
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
  }, [dispatch, listProduct]);

  const handleAddNewProduct = () => {
    dispatch(formActions.showFormCreate());
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

  const onHandleEdit = (id) => {
    dispatch(actionFetchProductById(id));
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
          pageSize={5}
          checkboxSelection
        />
      </div>
    </Container>
  );
}

export default withAdminPermission(AdminPage);
