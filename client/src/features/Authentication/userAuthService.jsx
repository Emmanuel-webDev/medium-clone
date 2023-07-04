import axios from "axios";

const url = "http://localhost:4000/signup";

const signUser = async (userData) =>{
    const response = await axios.post(url,userData);

    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data));
    }

    return response.data;
}

const userAuthService = {
    signUser
}

export default userAuthService;