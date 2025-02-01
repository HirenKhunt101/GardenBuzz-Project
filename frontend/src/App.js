// connect router to bowser

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import React, { Component } from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./Controllers/Navbar/navbar";
import Navbar from "./Controllers/Navbar/Navbar";
import Content from "./Controllers/Content/Content";
import Footer from "./Controllers/Footer/Footer";
import Sellform from "./Controllers/Sellform/Sellform";
import Login from "./Controllers/Login/Login";
import Register from "./Controllers/Register/SellerRegister";
import Upload from "./Controllers/uploadFiles/sellerProducts";
import AddImage from "./Controllers/uploadFiles/addImage";
import Plant from "./Controllers/Product/plant";
import Cart from "./Controllers/Cart/Cart";
import Chatbox from "./Controllers/ChatBox/ChatBox";
import Product from "./Controllers/Product/product";
import ProductDetail from "./Controllers/Product/productDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<div className="home"><Navbar /><Content /><Footer /></div>} />
        <Route path="/" element={ <div className="home"><Navbar /><Content /><Footer /></div>}/>
        <Route path="addImage" element={<div className="addimage"><Navbar /><AddImage /><Footer /></div> } />
        <Route path="Upload" element={ <div className="Upload"> <Navbar /> <Upload />  <Footer />  </div>  }  />
        <Route path="login" element={  <div className="Login"> <Navbar /> <Login />  </div>  }  />
        <Route path="register"element={  <div className="Register"> <Navbar /> <Register /> </div> }  />
        <Route path="Cart" element={  <><Navbar /> <Cart /> <Footer /> </>  } />
        <Route path="Product/:Category" element={  <><Navbar /> <Product /> <Footer /> </>  } />        
        <Route path="Product/:id/:id" element={  <><Navbar /> <ProductDetail/>  </>  } />        

        {/* Currently Not In Use */}
        <Route path="Sellform" element={ <div className="Sellform"> <><Navbar /><Sellform /><Footer /></></div>}/>
        <Route path="Plant" element={ <>  <Navbar /> <Plant /> <Footer /> </> } />
        <Route path="Chatbox" element={  <><Navbar /> <Chatbox /> <Footer /> </>  } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
