import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ordermanagementbe-production.up.railway.app/api/v1/",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": true,
  },
});

export const api = (method, endpoint, payload) => {
  return axiosClient(endpoint, { method: method, data: payload })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
