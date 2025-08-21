import { Routes, Route, useLocation } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";

import Header from "./Components/Header";
import Loader from "./Components/Loader";
import Home from "./Components/Home";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import BlinkitSection from "./Components/BlinkitSection";
import CategorySection from "./Components/CategorySection";
import ProductDetail from "./Components/ProductDetail";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";




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
              {/* <BlinkitSection />
              <CategorySection/> */}
            
            </>
          )}

          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
             
           
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
