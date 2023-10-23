import { api } from "./api";

const SignUp = (NewUser) => {
  return api("POST", "auth/signup", NewUser);
};

const SignIn = (UserData) => {
  return api("POST", "auth/signin", UserData);
};

const Logout = () => {
  return api("POST", "auth/signout", "");
};

const getUserById = (id) => {
  const url = " auth/user/" + id;
  return api("GET", url, null);
};

export { SignIn, SignUp, Logout, getUserById };
