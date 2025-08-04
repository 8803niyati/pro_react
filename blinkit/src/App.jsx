import { Routes, Route, useLocation } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";

import Header from "./Components/Header";
import Loader from "./Components/Loader";
import Home from "./Components/Home";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import BlinkitSection from "./Components/BlinkitSection";


function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const hideSections =
    location.pathname === "/add-product" ||
    location.pathname.startsWith("/edit-product");

  useEffect(() => {
    if (location.pathname === "/") {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowLoader(false); // Don't show loader on other routes
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
              
            </>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;