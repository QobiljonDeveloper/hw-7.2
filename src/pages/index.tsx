import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/index";
import { FadeLoader } from "react-spinners";
import Food from "./food";
import FoodsDetails from "../components/FoodsDetails/FoodsDetails";
const ProductsDetail = lazy(
  () => import("../components/ProductsDetail/ProductsDetail")
);

const Home = lazy(() => import("./home"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <FadeLoader color="#5DA4E3" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<Home />} />
          <Route path="products/:id" element={<ProductsDetail />} />
          <Route path="/foods" element={<Food />} />
          <Route path="/foods/:id" element={<FoodsDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default React.memo(AppRouter);
