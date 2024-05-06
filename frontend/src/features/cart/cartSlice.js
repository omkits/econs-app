import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import cartService from './cartservice';



const initialState = {
    cart: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    messge: ''
};

//get all cart
export const getCart = createAsyncThunk(
    'cart/getAll',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await cartService.getcart(token)
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

//add cart 
export const addCart = createAsyncThunk(
    'cart/add',
    async(cartData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            console.log(cartData)
        return await cartService.addCart(token, cartData)
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


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (buiilder) => {
        buiilder
        .addCase(getCart.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.cart = [...action.payload]
        })
        .addCase(getCart.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.messge = action.payload
        })
        .addCase(addCart.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.cart = [...action.payload]
        })
        .addCase(addCart.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.messge = action.payload
        })
    }
})

export const {reset} = cartSlice.actions
export default cartSlice.reducer