import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./main.css";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/homePage/Home";
import Explore from "./pages/explorePage/Explore";
import Share from "./pages/sharePage/Share.jsx";
import LoginPage from "./pages/loginPage/LoginPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/user/*"
          element={
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/share" element={<Share />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);