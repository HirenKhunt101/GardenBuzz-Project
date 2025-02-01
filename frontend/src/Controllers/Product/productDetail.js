import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./productDetail.css";
import { UserData } from "../SystemSetup/UserData";
import { useNavigate } from "react-router-dom";
import Loading from "../SystemSetup/Loading";
import {
  FaChevronLeft,
} from "react-icons/fa";

function ProductDetail() {
  const product = useParams();
  console.log(product);
  const navigate = useNavigate();
  const user_data = new UserData().getData('token');
  const [imageMap, setImageMap] = useState({});
  const [ProductDetail, setProductDetail] = useState({});
  const [CartDetail, setCartDetail] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleImageError = (url) => {
    const newImageMap = { ...imageMap };
    delete newImageMap[url];
    setImageMap(newImageMap);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(user_data) {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/read_product_detail`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                UserId: user_data?user_data[0]._id:"",
                ProductId: product.id,
              }),
            }
          );
          const data = await response.json();
          setProductDetail(data.data.product_detail);
          setCartDetail(data.data.cart_detail != null);
          setLoading(false);
        }
        else {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/read_product_detail`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // UserId: user_data?user_data[0]._id:"",
                ProductId: product.id,
              }),
            }
          );
          const data = await response.json();
          setProductDetail(data.data.product_detail);
          setLoading(false);
        }

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [imageMap]);

  const handleBackClick = (Category) => {
    navigate(`../../Product/${Category}`)
    console.log(Category);
  };


  const addToCart = async (productId) => {
    if(user_data) {
      // setCartItems([...cartItems, product]);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/add_product_in_cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: {
              _id: productId,
            },
            UserId: user_data[0]._id,
          }),
        }
      );
      if (response.ok) {
        alert("Product added successfully!");
        setCartDetail(true)
      }
    }
    else {
      localStorage.setItem("path", JSON.stringify(`/Product/plant/${productId}`));
      // window.location.href ='/login';
      navigate("/login");
    }
   
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };

  const removeFromCart = async (productId) => {
    // setCartItems(cartItems.filter((item) => item._id !== productId));
    let body = JSON.stringify({
      ProductId: productId,
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
      setCartDetail(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getRandomNumber = function (Price) {
    return (Price % 39) + 10;
    return Math.floor(Math.random() * 50 + 1);
  };


  return (
    <>
    <div className="card">
    {/* <nav> */}
      {/* <svg className="arrow" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " stroke="#727272"/></svg>
      Back to all Plants
      <svg className="heart" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" stroke="#727272" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" stroke="#727272"/></svg> */}
    {/* </nav> */}
    <div className="photo">
      {/* <img src="./../ProductImages/Product10.jpg">
       */}
        <img
          src={ProductDetail.ImageURL}
          alt=""
          className="product-img"
        />
    </div>
    {loading && <Loading/>}
    <div className="description">
      <div className="back-icon">
        <h3 className="back-button-text" onClick={() => handleBackClick(ProductDetail.Category)}>Back</h3>
        <button className="back-button-button" onClick={() => handleBackClick(ProductDetail.Category)} >
          <FaChevronLeft size={24} color="black"/> 
        </button>
      </div>
      <h2>{ProductDetail.Name}</h2>
      {/* <h4>Popular House Plant</h4> */}
      <h1>{ProductDetail.Price}₹</h1>
      <p>{ProductDetail.Name} is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.</p>
      {/* <button className="description-button">Add to Cart</button> */}
      {!CartDetail && (
        <button
          className="description-button"
          onClick={() => addToCart(ProductDetail._id)}
        >
          Add to Cart
        </button>
      )}
      {CartDetail && (
        <button
          className="description-button"
          onClick={() => removeFromCart(ProductDetail._id)}
        >
          Remove From Cart
        </button>
      )}
        <button className="description-button">Wishlist</button>
    </div>
  </div>
    </>
  );
}

export default ProductDetail;
