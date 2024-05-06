import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';


//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))





const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//register user
export const register = createAsyncThunk(
    'auth/register',
     async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message)
             || error.message 
             || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//login user
export const login = createAsyncThunk(
    'auth/login',
    async(user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message)
                 || error.message 
                 || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//get user 
// export const getUser = createAsyncThunk(
//     'auth/getuser',
//     async(_, thunkAPI) => {
//         try {
//             const token = thunkAPI.getState().auth.user.token;
//             return await authService.getUser(token)
//         } catch (error) {
//             const message = (error.response && 
//                 error.response.data && 
//                 error.response.data.message)
//                  || error.message 
//                  || error.toString()
//             return thunkAPI.rejectWithValue(message)
//         }
//     }
// )


//log out user
export const logout = createAsyncThunk('auth/logout', async() => {
    return await authService.logout
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''

        }
    },
    extraReducers: (buiilder) => {
        buiilder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        }) 
        .addCase(register.fulfilled, (state, action) => {
            state.isSuccess = true
            state.isLoading = false
            state.user = action.payload
        }) 
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        }) 
        .addCase(login.pending, (state) => {
            state.isLoading = true
        }) 
        .addCase(login.fulfilled, (state, action) => {
            state.isSuccess = true
            state.isLoading = false
            state.user = action.payload
        }) 
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        }) 
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            localStorage.removeItem('user')
          })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
