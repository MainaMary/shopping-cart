import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

interface Props {
  path: string;
  component: JSX.Element;
}
const pageRoutes = [
  {
    path: "/",
    component: <Homepage />,
  },
  {
    path: "/cart",
    component: <Cart />,
  },
  {
    path: "/notFound",
    component: <NotFound />,
  },
];

const MainRoutes = () => {
  return (
    <div style={{ padding: "0 28px" }}>
      <Routes>
        {pageRoutes.map(({ path, component }: Props, index: number) => (
          <Route key={index} path={path} element={component} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
