import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllProduct } from "./store/producterSlice";
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import Chatbot from "./components/Layout/Chatbot";

import HomePage from "./components/pages/Home";
import DetailPage from "./components/pages/DetailPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ShopPage from "./components/pages/ShopPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  // fetch Api products
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      if(!res.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await res.json();
      if (data) {
        dispatch(getAllProduct(data));
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />}>
          <Route path="/shop/:item" element={<ShopPage />}/>
        </Route>
        <Route path="/detail" element={<DetailPage />}>
          <Route path='/detail/:productId' element={<DetailPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* <ChatBot steps={steps} /> */}
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
