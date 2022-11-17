import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import styled from "styled-components";
import { ProductProps } from "../types";
import { useDispatch } from "react-redux";
import { removeCartItems } from "../slice/CartSlice";
import { useNavigate } from "react-router-dom";

import {
  increaseCart,
  decreaseCart,
  clearCart,
  calculateSubTotal,
} from "../slice/CartSlice";
import { Button } from "../styled";
import { calculateTotal } from "../tools";

const Cart = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    dispatch(removeCartItems(id));
  };
  const handleIncrease = (item: ProductProps) => {
    dispatch(increaseCart(item));
  };
  const handleDecrease = (item: ProductProps) => {
    dispatch(decreaseCart(item));
  };
  const handleClearCart = () => {
    console.log("cart cleared");
    dispatch(clearCart());
  };
  useEffect(() => {
    dispatch(calculateSubTotal());
  }, [state]);
  return (
    <div>
      <Title>Shopping cart</Title>
      <div style={{ margin: "24px 0" }}>
        {state.cartItems.length ? (
          <>
            <Header>
              <h2>Product</h2>
              <h2>Quantity</h2>
              <h2>Price</h2>
              <h2>Total</h2>
            </Header>
            <Wrapper>
              <CartWrapper>
                {state.cartItems.map((item: ProductProps) => (
                  <CartItems key={item.id}>
                    <div style={{ display: "flex", background: "#fff" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "30%",
                          height: "auto",
                        }}
                      />
                      <Desc>
                        <div>
                          <h2>{item.name}</h2>
                          <p>
                            {item?.description &&
                              item?.description?.slice(0, 40)}
                          </p>

                          <DeleteBtn
                            primary
                            onClick={() => handleDelete(item.id)}
                          >
                            Remove
                          </DeleteBtn>
                        </div>
                      </Desc>
                    </div>
                    <Quantity>
                      <Quantitybtn onClick={() => handleDecrease(item)}>
                        -
                      </Quantitybtn>
                      <CartQuantity>{item.cartQuantity}</CartQuantity>
                      <Quantitybtn onClick={() => handleIncrease(item)}>
                        +
                      </Quantitybtn>
                    </Quantity>
                    <Price>
                      <p>{item.price}</p>
                    </Price>

                    <Price>
                      <p>{calculateTotal(item.price, item.cartQuantity)}</p>
                    </Price>
                  </CartItems>
                ))}
              </CartWrapper>
              <CartSummary>
                <div style={{ width: "100%" }}>
                  <div>
                    <h2>Cart summary</h2>
                  </div>
                  <div
                    style={{
                      margin: "30px 0",
                      display: "flex",
                      width: "60%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TotalText>Sub total</TotalText>
                    <TotalText>{`$${state.cartTotalAmount}`}</TotalText>
                  </div>
                  <div>
                    <DeleteBtn primary>Checkout</DeleteBtn>
                  </div>
                </div>
              </CartSummary>
            </Wrapper>
            <div>
              <Button onClick={handleClearCart}>Clear cart</Button>
              <div></div>
            </div>
          </>
        ) : (
          <EmptyCart>
            <div>
              <h2>Your cart is currently empty</h2>
              <BtnWrapper>
                <DeleteBtn onClick={() => navigate("/")}>
                  Start shopping
                </DeleteBtn>
              </BtnWrapper>
            </div>
          </EmptyCart>
        )}
      </div>
    </div>
  );
};

export default Cart;
const Header = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 1fr;
  width: 80%;
  height: auto;
  text-align: center;

  align-content: center;
  width: 80%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Title = styled.h2`
  text-align: center;
  margin-top: 30px;
`;
const CartItems = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 1fr;
  margin: 48px 0;
  background: #fff;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
  }
`;
const Quantity = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
  }
`;

const Desc = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const CartQuantity = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
const Quantitybtn = styled.button`
  height: 40px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: blue;
  border: none;
  color: #fff;
  border-radius: 5px;
  font-weight: 500;
  font-size: 24px;
`;
const Price = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  align-items: center;
  p {
    font-size: 18px;
    font-weight: 500;
  }
`;
const DeleteBtn = styled.button.attrs((props: { primary: boolean }) => props)`
  width: ${(props) => (props.primary ? "80%" : "100%")};
  margin-top: 20px;
  background-color: blue;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 16px;
  font-weight: 400;
  font-size: 14px;
`;

const CartWrapper = styled.div`
  width: 80%;
  box-shadow: 0 0 3px #777;
  border-radius: 5px;
  padding: 24px 12px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const CartSummary = styled.div`
  width: 18%;
  box-shadow: 0 0 3px #777;
  background: #fff;
  padding: 8px 12px;
  height: 200px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 32px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 30%;
  box-shadow: 0 0 3px #777;
  border-radius: 5px;
  padding: 30px 0;
`;
const BtnWrapper = styled.div`
  margin: auto;
  text-align: center;
`;
const TotalText = styled.span`
  font-weight: 900;
  color: #000;
  font-size: 20px;
`;
