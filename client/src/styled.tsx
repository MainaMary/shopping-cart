import styled from "styled-components";
export const Button = styled.button.attrs(
  (props: { primary: boolean }) => props
)`
  padding: ${(props) => (props.primary ? "16px 12px" : "10px 12px")};
  text-align: center;
  cursor: pinter;
  outline: none;
  font-size: 16px;
  color: ${(props) => (props.primary ? "#fff" : "blue")};
  border-radius: 5px;
  background: ${(props) => (props.primary ? "blue" : "white")};
  margin: 12px 0;
  font-weight: 500;
  width: ${(props) => (props.primary ? "100%" : "10%")};
  border: 2px solid blue;
  @media screen and (max-width: 768px) {
    width: ${(props) => (props.primary ? "100%" : "100%")};
  }
`;
