import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService';


const initialState ={
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


//fetch products
export const fetchProducts = createAsyncThunk(
    'products/',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await productService.fetchProducts( token)
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

//search product by category
export const productsByCategory = createAsyncThunk(
    'products/category',
    async(category, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await productService.productsByCategory(category, token)
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




export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (buiilder) => {
        buiilder
        .addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess=  true
            // state.product.push(action.payload)
            state.product = [...action.payload]
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(productsByCategory.pending, (state) => {
            state.isLoading = true
        })
        .addCase(productsByCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess=  true
            console.log(action.payload)
            state.product = [...action.payload]
        })
        .addCase(productsByCategory.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
       
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer