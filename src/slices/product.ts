import { addProduct, deleteProduct, getProducts, getProductById, updateProduct } from '@/actions/product';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: ''
} as any

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
    });

    // adding
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    // updating
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const newProduct = action.payload;
      state.products = state.products.map((item: any) =>
        item.id === newProduct.id ? newProduct : item
      );
    });

    // deleting
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((item: any) => item.id !== id);
    });

    // fetching product by id
    builder.addCase(getProductById.pending, (state, action) => {
      state.isLoading = true;
      state.selectedProduct = null; // Reset thông tin chi tiết sản phẩm khi bắt đầu fetching
      state.error = '';
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedProduct = action.payload; // Lưu thông tin chi tiết sản phẩm vào selectedProduct
    });
    builder.addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.error === 'string' ? action.error : '';
        state.selectedProduct = null;
      });
  }
});

export const productReducer = productSlice.reducer;
