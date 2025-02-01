import React, { useState } from "react";
import "./sellform.css";



const Sellform = () => {
  return (
    <>  
      <main className="selllformnmain">
        <section className="sellformsection">
          <div className="sellform__container grid">
            <div className="p1">
                <h1>Product Form</h1>
              <form action="" method="post">
                <label for="product-name">Name:</label>
                <input type="text" id="product-name" name="product-name" required/>
              
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" min="0" step="0.01" required/>
              
                <label for="description">Description:</label>
                <textarea id="description" name="description" rows="1" required></textarea>
              
                <label for="pots-color">Pot Color:</label>
                <select id="pots-color" name="pots-color[]" >
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
                {/* <input type="color" id="pots-color" name="pots-color[]" value="#ff0000"></input>
                <input type="submit"></input> */}
                
                <label for="care-instructions">Care Instructions:</label>
                <textarea id="care-instructions" name="care-instructions" rows="1" required></textarea>
              
                <label for="product-quantity">Product Quantity:</label>
                <input type="number" id="product-quantity" name="product-quantity" min="0" required/>
              
                <label for="image-upload">Image Upload:</label>
                <input type="file" id="image-upload" name="image-upload" required/>

              </form>
            </div>
            <div className="p2">
                <h1>Seller Information</h1>
              <form action="" method="post">
                <label for="seller-name">Name:</label>
                <input type="text" id="seller-name" name="seller-name" required/>
              
                <label for="seller-mobile">Mobile:</label>
                <input type="tel" id="seller-mobile" name="seller-mobile" required/>
              
                <label for="pickup-address">Pickup Address:</label>
                <textarea id="pickup-address" name="pickup-address" rows="1" required></textarea>
              
                <label for="business-details">Business Details:</label>
                <textarea id="business-details" name="business-details" rows="1"></textarea>
              
                <label for="shipping-payment-details">Shipping and Payment Details:</label>
                <textarea id="shipping-payment-details" name="shipping-payment-details" rows="1" required></textarea>
              
                <label for="refund-policy">Refund Policy:</label>
                <textarea id="refund-policy" name="refund-policy" rows="1" required></textarea>
                <input type="submit" value="Submit"/>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Sellform;