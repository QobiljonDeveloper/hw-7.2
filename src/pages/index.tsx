import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/index";
import Home from "./home";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default React.memo(AppRouter);
