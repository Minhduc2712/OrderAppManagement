import axios from "axios";
import Cookies from "js-cookie";

const tokenString = Cookies.get("userPayload");
let userId;
let accessToken;
if (tokenString) {
  const token = JSON.parse(tokenString);
  userId = token.userId;
  accessToken = token.jwtToken;
}

const fetchUserContent = async () => {
  try {
    const response = await axios.get("/api/v1/test", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Thay thế bằng JWT Token của bạn
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
