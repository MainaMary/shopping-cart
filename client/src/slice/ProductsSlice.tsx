import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
enum Status {
  idle = "idle",
  pending = "pending",
  succeeded = " succeeded",
  failed = "failed",
}
interface Todo {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}
const initialState = {
  items: {},
  loading: Status,
};

export const getProducts = createAsyncThunk<Todo[]>(
  "products/getProducts",
  async () => {
    const response = await axios("http://localhost:5000/products");
    return response?.data as Todo[];
  }
);
export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {},
});

//for the configure store
const ProductsReducer = ProductsSlice.reducer;
export { ProductsReducer };
