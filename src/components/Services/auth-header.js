export default function authHeader() {
  const tokenString = Cookies.get("userPayload");
  let userId;
  let accessToken;

  if (tokenString) {
    const token = JSON.parse(tokenString);
    userId = token.userId;
    accessToken = token.jwttoekn;
  }
  if (userId && accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
