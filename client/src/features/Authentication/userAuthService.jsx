import axios from "axios";

const signupURL = import.meta.env.VITE_SIGNUP;
const loginURL = import.meta.env.VITE_LOGIN;
  
// register/signup a user
const signUser = async (userData) =>{
    const response = await axios.post(signupURL,userData);

    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data));
    }

    return response.data;
}

//loggin in the user 

const loginUser = async (userData) =>{
    const response = await axios.post(loginURL,userData);

    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data));
    }

    return response.data;
}

//logging out the user

const logout = async()=>{
    localStorage.removeItem('user');
}

const userAuthService = {
    signUser,
    loginUser,
    logout
}

export default userAuthService;