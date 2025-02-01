import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./Cart.css";
import { UserData } from "../SystemSetup/UserData";
import { useNavigate } from "react-router-dom";
import Loading from "../SystemSetup/Loading";

function Cart() {
  const navigate = useNavigate();
  const user_data = new UserData().getData('token');
  if(!user_data) {
    localStorage.setItem("path", JSON.stringify("/Cart"));
    // window.location.href = '/login';
    navigate("/login");
  }

  const [imageMap, setImageMap] = useState({});
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [packagingFee, setPackagingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(true);


  const handleImageError = (url) => {
    const newImageMap = { ...imageMap };
    delete newImageMap[url];
    setImageMap(newImageMap);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/place_order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: user_data?user_data[0]._id:"",
        }),
      }
    );
    const data = await response.json();
    if (data.ok) {
      alert(data.message);
      // window.location.href = "/home";
      navigate("/home");

    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/get_cart_details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              UserId: user_data?user_data[0]._id:"",
            }),
          }
        );
        const data = await response.json();
        // console.log(data);
        let totalPrice = 0;
        for (let pro of data.data) {
          totalPrice += Number(pro.Price * pro.ProductQuantity);
        }
        setPrice(totalPrice);
        setProductData(data.data);
        if(data.data.length > 0) {
          setDeliveryCharges(40);
          setPackagingFee(10 * Number(data.data.length))
        }
        setLoading(false);
        // console.log(totalPrice);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [imageMap, cartItems]);

  const addToCart = async (product) => {
    setCartItems([...cartItems, product]);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/add_product_in_cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: product,
        }),
      }
    );
    // console.log(response);
    if (response.ok) {
      alert("Product added successfully!");
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };

  const removeFromCart = async (product) => {
    // setCartItems(cartItems.filter((item) => item._id !== productId));
    if(productData.length <= 1) {
      setDeliveryCharges(0);
    }
    setProductData(productData.filter((item) => item._id !== product._id));
    setPrice(price - product.Price * product.ProductQuantity)
    console.log(123);
    let body = JSON.stringify({
      ProductId: product._id,
    });
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/remove_product_from_cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );
    // console.log(response);
    if (response.ok) {
      alert("Product Removed successfully!");
    }
    // window.location.href = "/Cart";
    navigate("/Cart");

  };

  const handleIncrement = async (productId) => {
    const updatedCartItems = productData.map((item) => {
      if (item._id === productId) {
        let body = {
          ProductId: productId,
          Quantity: Number(item.ProductQuantity) + 1,
        };
        const response = fetch(
          `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/update_cart_product_quantity`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        setPrice(price + item.Price);
        return {
          ...item,
          ProductQuantity: Number(item.ProductQuantity) + 1,
        };
      }
      return item;
    });
    setProductData(updatedCartItems);
    // console.log(updatedCartItems);
  };

  const handleDecrement = (productId) => {
    const updatedCartItems = productData.map((item) => {
      if (item._id === productId) {
        if (Number(item.ProductQuantity) > 1) {
          let body = {
            ProductId: productId,
            Quantity: Number(item.ProductQuantity) - 1,
          };
          const response = fetch(
            `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/update_cart_product_quantity`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
          setPrice(price - item.Price);
          return {
            ...item,
            ProductQuantity: Number(item.ProductQuantity) - 1,
          };
        }
      }
      return item;
    });
    setProductData(updatedCartItems);
  };
  return (
    <>
      {/* <div className="heading_container d-flex align-items-center">
      <figure class="ml-5">
        <img src="assets/images/hotel_icon.png" alt="hotel icon" />
      </figure>
      <img src="assets/images/vertical_line.png" class="line ml-4" />
      <h4 className="heading_text">Cart</h4>
    </div> */}
      {loading && <Loading/>}
      <div className="productContainer">
        <div className="imageContainer">
          {Array.isArray(productData) ? (
            productData.map((product) => (
              <div key={product._id} className="productCard">
                <img
                  src={product.ImageURL}
                  alt={product.Name}
                  className="productImage"
                  onError={() => handleImageError(product.ImageURL)}
                />
                <div className="productDetails">
                  <h3>{product.Name}</h3>
                  <p>Price: ₹{product.Price}</p>
                  {/* <p>Quantity: {product.ProductQuantity}</p> */}
                  <p>
                    Quantity:
                    <button
                      className="quantityButton"
                      onClick={() => handleDecrement(product._id)}
                    >
                      -
                    </button>
                    {product.ProductQuantity}
                    <button
                      className="quantityButton"
                      onClick={() => handleIncrement(product._id)}
                    >
                      +
                    </button>
                  </p>
                  <p>Total: ₹{product.Price * product.ProductQuantity}</p>
                  <button
                    className="removeFromCart"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove From Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="PlaceOrderClass">
        <form onSubmit={handleSubmit}>
          <div className="two-column-form">
            <div className="column">
              <h3>Order Details</h3>

              {/* <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="1"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          /> */}
              <div className="priceCalculation">
                <div className="priceCalculationItem">
                  <span className="itemName">Price:</span>
                  <span className="itemValue">₹{price}</span>
                </div>
                <div className="priceCalculationItem">
                  <span className="itemName">Discount:</span>
                  <span className="itemValue">₹{price % 50}</span>
                </div>
                <div className="priceCalculationItem">
                  <span className="itemName">Delivery Charges:</span>
                  {/* <span className="itemValue">₹{deliveryCharges}</span> */}
                  <span className="itemValue">₹{deliveryCharges}</span>
                </div>
                <div className="priceCalculationItem">
                  <span className="itemName">Secured Packaging Fee:</span>
                  <span className="itemValue">₹{10 * productData.length}</span>
                </div>
                <div className="priceCalculationItem">
                  <span className="itemName">Total:</span>
                  <span className="itemValue">
                    ₹{price - (price % 50) + deliveryCharges + 10 * productData.length}
                  </span>
                </div>
              </div>

              {/* <label htmlFor="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            min="0"
            step="1"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
            required
          />

          <label htmlFor="total">Total:</label>
          <input
            type="number"
            id="total"
            name="total"
            min="0"
            step="1"
            value={total}
            onChange={(e) => setTotal(parseFloat(e.target.value))}
            required
          /> */}
            </div>

            <div className="column">
              <h3>Shipping Details</h3>

              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />

              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </div>

          <input type="submit" name="submit" value="PLACE ORDER" disabled={price===0} />
        </form>
      </div>
    </>
  );
}

export default Cart;
