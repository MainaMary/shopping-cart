import { ProductsReducer } from "./slice/ProductsSlice";
import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { productsApi } from "./features/productsApi";
import CartReducer from "./slice/CartSlice";

export const store = configureStore({
  reducer: {
    product: ProductsReducer,
    cart: CartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
