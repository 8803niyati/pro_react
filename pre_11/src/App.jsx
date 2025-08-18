// App.jsx
import { Routes, Route, useLocation } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";

import Home from "./Components/Home";
import Header from "./Components/Header";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import BlinkitSection from "./Components/BlinkitSection";
import CategorySection from "./Components/CategorySection";
import Loader from "./Components/Loader";
import ProductDetail from "./Components/ProductDetail";

function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  // Hide BlinkitSection + CategorySection for these pages
  const hideSections =
    location.pathname === "/add-product" ||
    location.pathname.startsWith("/edit-product") ||
    location.pathname.startsWith("/product/");

  useEffect(() => {
    if (location.pathname === "/") {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Header />

      {showLoader ? (
        <Loader />
      ) : (
        <>
          {!hideSections && (
            <>
              <BlinkitSection />
              <CategorySection />
            </>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;