import { cartReducer } from '@/slices/cart';
import { counterReducer } from '@/slices/counter';
import { productReducer } from '@/slices/product';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from '@/slices/auth';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { commentReducer } from '@/slices/comment';



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    counter: counterReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authSliceReducer,
    comment:commentReducer 
 })

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default persistStore(store);
