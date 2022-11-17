import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import styled from "styled-components";
import { ProductProps } from "../types";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, calculateSubTotal } from "../slice/CartSlice";
import { Button } from "../styled";
const Homepage = () => {
  const { data, isLoading, error } = useGetAllProductsQuery("products");
  const dispatch = useDispatch();

  const handleAddToCart = (product: ProductProps) => {
    dispatch(addToCart(product));
    dispatch(calculateSubTotal());
  };

  return (
    <div>
      {error ? (
        <p>An error occurred</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Filters>
            <Title>Products available</Title>
            <Button>Filter</Button>
          </Filters>

          <Container>
            {data?.map((product: ProductProps) => (
              <Card key={product.id}>
                <Title>{product.name}</Title>
                <img loading="lazy" src={product.image} alt={product.name} />
                <div>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </div>
                <Button primary onClick={() => handleAddToCart(product)}>
                  <BsFillCartFill style={{ marginRight: "12px" }} />
                  Add to cart
                </Button>
              </Card>
            ))}
          </Container>
        </div>
      )}
    </div>
  );
};

export default Homepage;
const Title = styled.h2`
  text-align: center;
  margin-top: 12px;
  margin-bottom: 20px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Card = styled.div`
  border-radius: 5px;
  box-shadow: 0px 0px 3px #777777;
  max-width: 350px;
  width: 100%;
  margin: 16px 0;

  padding: 12px 12px;
  img {
    width: 100%;
    height: auto;
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  @media screen and (max-width: 768px) {
    height: auto;
    flex-direction: column;
  }
`;
