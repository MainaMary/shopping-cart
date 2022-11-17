import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../types";
import { calculateTotal } from "../tools";

interface Props {
  cartItems: ProductProps[];
  cartNumberOfProducts: number;
  cartTotalAmount: number;
}
const initialState: Props = {
  cartItems: [],
  cartNumberOfProducts: 0,
  cartTotalAmount: 0,
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: PayloadAction<ProductProps>) => {
      let productId = action.payload.id;
      const indexItem = state.cartItems.findIndex(
        (item: ProductProps) => item.id === productId
      );
      if (indexItem >= 0) {
        state.cartItems[indexItem].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
    },
    removeCartItems: (state: any, action: PayloadAction<string>) => {
      const filteredItems = state.cartItems.filter(
        (item: ProductProps) => item.id !== action.payload
      );
      console.log(filteredItems);
      state.cartItems = filteredItems;
    },
    increaseCart: (state: any, action: PayloadAction<ProductProps>) => {
      const findItem = state.cartItems.findIndex(
        (item: ProductProps) => item.id === action.payload.id
      );

      if (state.cartItems[findItem].cartQuantity >= 1) {
        state.cartItems[findItem].cartQuantity += 1;
      }
    },
    decreaseCart: (state: any, action: PayloadAction<ProductProps>) => {
      const findItem = state.cartItems.findIndex(
        (item: ProductProps) => item.id === action.payload.id
      );

      if (state.cartItems[findItem].cartQuantity > 1) {
        state.cartItems[findItem].cartQuantity -= 1;
      } else if (state.cartItems[findItem].cartQuantity === 1) {
        const filteredItems = state.cartItems.filter(
          (item: ProductProps) => item.id !== action.payload.id
        );

        state.cartItems = filteredItems;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateSubTotal: (state) => {
      const getTotalQuantity = state.cartItems.reduce(
        (accum: any, item) => {
          const { price, cartQuantity } = item;
          const totalCost = calculateTotal(price, cartQuantity);
          const getTotal = totalCost?.substring(1);
          accum.subTotal += Number(getTotal);
          accum.cartQuantity += cartQuantity;

          return accum;
        },
        {
          subTotal: 0,
          cartQuantity: 0,
        }
      );
      state.cartNumberOfProducts = getTotalQuantity.cartQuantity;
      state.cartTotalAmount = getTotalQuantity.subTotal;
    },
  },
});

export const {
  addToCart,
  removeCartItems,
  increaseCart,
  decreaseCart,
  clearCart,
  calculateSubTotal,
} = CartSlice.actions;
export default CartSlice.reducer;
