// ImageUploader.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './ImageUploader.css';
import {Link ,redirect} from 'react-router-dom'
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [file, setFile] = useState();
  const history = useNavigate()
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(event.target.files[0])
    if (imageFile) {
      setSelectedImage(URL.createObjectURL(imageFile));
    }
   
  };
  
  const handleExtractInfo = async (e) => {
    // Dummy extracted information for demonstration purposes
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const res=await fetch(`/api/extract/add`, {
        method: "POST",
        body: formData
      });
     const bd= await res.json();
      console.log(bd);
      setExtractedInfo(bd);
      // You may want to re-fetch the updated data or update the local state as needed
    } catch (error) {
      console.error("Error updating entry:", error);
    }
    history("/")
    setSelectedImage(null);
  };
 const handleGet = () => {
  
 }
  return (
    <div className="image-uploader-container">
    <form onSubmit={(e)=>{handleExtractInfo(e)}} /*action="http://localhost:5000/api/extract/add" method="post" enctype="multipart/form-data"*/>
      <label className="upload-image">
     
        <input name='uploaded_file' id='uploaded_file' type="file" onChange={handleImageChange}  filename={file}
                    accept="image/*" style={{ display: 'none' }} />
     
        {!selectedImage ? (
          <p>To upload image Click or Drag</p>
        ) : (
          <div className="image-preview">
            <img src={selectedImage} alt="Selected" className="selected-image" />
          </div>
        )}
      </label>
      <button  className="extract-info-btn" >Extract</button>
      <Link  className="extract-info-btn" to="/getall">Get All</Link>
    </form>
      {extractedInfo && <div className="data-container">
            <h1>{extractedInfo.identification_number}</h1>
            <h1>{extractedInfo.name}</h1>
            <h1>{extractedInfo.last_name}</h1>
            <h1>{extractedInfo.date_of_birth}</h1>
            <h1>{extractedInfo.date_of_issue}</h1>
            <h1>{extractedInfo.date_of_expiry}</h1>
            <div className="button-group">
              {/* <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
              <button className="update-button" onClick={() => openUpdate(item)}>Update</button> */}
            </div>
          </div>}
  </div>
  );
};

export default ImageUploader;