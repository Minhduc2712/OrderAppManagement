import { api } from "./api";

const SignUp = (NewUser) => {
  return api("POST", "user/signup", NewUser);
};

const SignIn = (UserData) =>{
    return api("POST","user/signin", UserData);
}

export{
    SignIn,SignUp
}