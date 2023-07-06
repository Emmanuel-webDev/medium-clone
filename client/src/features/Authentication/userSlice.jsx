import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import userAuthService from './userAuthService';

const user = JSON.parse(localStorage.getItem('user'));

const token = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null


const initialState = {
    //If user exist in localstorage then get it other wise keep it null
    user: user ? user : null ,
    token,
    loading:false,
    success:false,
    error:false,
    message: ""
}
 
//Signup a user

export const signup = createAsyncThunk('auth/signup',async(user,thunkAPI)=>{
    try {
        return await userAuthService.signUser(user);

    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//log in the user
export const login = createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try {
        return await userAuthService.loginUser(user);

    } catch (error) {

        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//log out a user

export const logout = createAsyncThunk('auth/logout',
async()=>{
    await userAuthService.logout();
})

const userSlice = createSlice({
    name:"userAuthentication",
    initialState,
    reducers:{
        reset: (state)=>{
            state.loading = false;
            state.success = false;
            state.error = false;
            state.message = "";
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(signup.pending, (state)=>{
            state.loading = true;
        })
        .addCase(signup.fulfilled, (state,action)=>{
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            // localStorage.setItem('user',JSON.stringify(action.payload));
        })
        .addCase(signup.rejected, (state,action)=>{
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.user = null;
        })
        // logIn addCases 
        .addCase(login.pending, (state)=>{
            state.loading = true;
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            
        })
        .addCase(login.rejected, (state,action)=>{
            state.loading = false;
            state.error = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state)=>{
            state.user = null
        })
    }
})

export const {reset} = userSlice.actions;

export default userSlice.reducer;