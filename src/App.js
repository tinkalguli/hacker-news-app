import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
import NewsDetails from "./components/NewsDetails";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/:id" element={<NewsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
