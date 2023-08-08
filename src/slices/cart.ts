import { IProduct } from '@/interfaces/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
    items: [],
    discount: 0,
} as { items: any[];discount: number }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<IProduct>) => {
            const newProduct = action.payload;
            const existProductIndex = state.items.findIndex(item => item.id === newProduct.id);
            if (existProductIndex < 0) {
                state.items.push(newProduct)
            } else {
                state.items[existProductIndex].quantity++;
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        increase: (state, action: PayloadAction<number>) => {
            state.items.find(item => item.id === action.payload).quantity++
        },
        decrease: (state, action: PayloadAction<number>) => {
            const currentProduct = state.items.find(item => item.id === action.payload)
            currentProduct.quantity--;
            if (currentProduct.quantity < 1) {
                const confirm = window.confirm('Bạn có muốn xóa sản phẩm này không?')
                if (confirm) state.items = state.items.filter(item => item.id !== action.payload)
                currentProduct.quantity = 1
            }
        },
        removeCart: (state, action: PayloadAction<number>) => {
            const productIdToRemove = action.payload;
          
            // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng hay không
            const existingProduct = state.items.find(item => item.id === productIdToRemove);
          
            if (!existingProduct) {
              // Nếu sản phẩm không tồn tại, không thực hiện xóa và thông báo lỗi (hoặc thực hiện hành động khác)
              console.log("Sản phẩm không tồn tại trong giỏ hàng.");
              return;
            }
          
            const confirm = window.confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?');
            if (confirm) {
              const updatedItems = state.items.filter(item => item.id !== productIdToRemove);
              state.items = updatedItems;
            }
          },
          setDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
          },
          
        
    },
});

export const { add, increase, decrease ,removeCart,setDiscount} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;