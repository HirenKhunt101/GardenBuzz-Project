import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { UserData } from "../SystemSetup/UserData";
import { useNavigate } from "react-router-dom";


function AddImage() {
  const navigate = useNavigate();
  const user_data = new UserData().getData('token');

  const [imageUpload, setImageUpload] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("plant");
  const [careInstructions, setCareInstructions] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);

  const uploadFile = async (event) => {
    event.preventDefault();
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);

    const url = await getDownloadURL(imageRef);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/add_product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Price: price,
          Description: description,
          Category: category,
          CareInstructions: careInstructions,
          ProductQuantity: productQuantity,
          ImageURL: url,
          UserId: user_data[0]._id
        }),
      }
    );
    const data = await response.json();
    alert("Product Uploaded Successfully!");
    // window.location.href = "/Upload";
    navigate("/Upload");

  };

  return (
    <>
      <form onSubmit={uploadFile} className="form">
        <div className="form-column">
          <label htmlFor="product-name">Name:</label>
          <input
            type="text"
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="1"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="pots-color">Category:</label>
          <select
            id="pots-color"
            name="pots-color"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="plant">Plant</option>
            <option value="flower">Flowers</option>
            <option value="vine">Vine</option>
            <option value="plantcare"> Plant Care Product</option>
            <option value="fertilizer">Fertilizer</option>
          </select>

          <label htmlFor="care-instructions">Instructions:</label>
          <textarea
            id="care-instructions"
            name="care-instructions"
            rows="1"
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
          ></textarea>

          <label htmlFor="product-quantity">Product Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
          ></input>

          <input
            type="file"
            onChange={(event) => setImageUpload(event.target.files[0])}
            required
          />
          <input type="submit" name="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}



// function AddImage() {
//   const [selectedFile, setSelectedFile] = useState(null);
  
//   const handleFileUpload = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };
  
//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('image', selectedFile);

//     try {
//       const response = await fetch('/api/checkPlantImage', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       console.log(data);
//       // Handle the response from the backend
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       <button onClick={handleSubmit}>Upload and Check Image</button>
//     </div>
//   );
// }

export default AddImage;

