import axios from "axios";

const signupURL = "http://localhost:4000/signup";
const loginURL = "http://localhost:4000/login";

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