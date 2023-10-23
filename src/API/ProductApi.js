import { api } from "./api";

// get listProduct API
const getListProductAPI = () => {
  return api("GET", "product/", null);
};
const getListFilterdProductAPI = (params) => {
  params = params?.toString();
  let url = `product?` + params;
  return api("GET", url, null)
    .then((response) => {
      console.log("API Response:", response);
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const getProductByIdAPI = (id) => {
  let url = "product/" + id;
  return api("GET", url, null);
};

const addProductNewAPI = (ProductNew) => {
  return api("POST", "product/", ProductNew);
};

const deleteProductAPI = (id) => {
  let url = "product/" + id;
  return api("DELETE", url, null);
};

const updateProductAPI = (productUpdate) => {
  let url = "product/" + productUpdate.id;
  return api("PUT", url, productUpdate);
};

const searchProductAPI = (params) => {
  params = params?.toString();
  let url = `product/search?query=` + params;
  return api("GET", url, null)
    .then((response) => {
      console.log("API Response:", response);
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export {
  getListProductAPI,
  getListFilterdProductAPI,
  getProductByIdAPI,
  addProductNewAPI,
  deleteProductAPI,
  updateProductAPI,
  searchProductAPI,
};
