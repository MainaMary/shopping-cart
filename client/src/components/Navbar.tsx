import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Navbar = () => {
  const state = useSelector(
    (state: RootState) => state.cart.cartNumberOfProducts
  );

  return (
    <Nav>
      <NavLink to="/">Shopping spree</NavLink>
      <NavLink to="/cart">
        <Box>
          <BsFillCartFill className="cartIcon" />
          <Span>{state}</Span>
        </Box>
      </NavLink>
    </Nav>
  );
};

export default Navbar;
const Nav = styled.nav`
  display: flex;
  height: 60px;
  padding: 0 36px;
  align-items: center;
  justify-content: space-between;
  background-color: blue;
`;
const Box = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-right: 16px;
`;
const Span = styled.span`
  position: absolute;
  top: -12px;
  font-weight: 700;
  right: -25px;
  width: 30px;
  height: 30px;
  border-radius: 40px;
  line-height: 30px;
  text-align: center;
  background-color: #ecf0f3;
  color: blue;
  font-size: 16px;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
`;
