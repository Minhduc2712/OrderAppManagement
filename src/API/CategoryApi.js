import { api } from "./api";

const getListCategoryAPI = () => {
  return api("GET", "categories", null);
};

export { getListCategoryAPI };
