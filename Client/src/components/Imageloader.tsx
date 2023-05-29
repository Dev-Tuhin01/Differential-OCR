import React, { useState } from "react";
import "./Imageloader.css";
import axios from "axios";

export const Imageloader = () => {
  const [image, setImage] = useState("");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore: Object is possibly 'null';
    console.log(URL.createObjectURL(event.target!.files[0]));
    // @ts-ignore: Object is possibly 'null';
    setImage(URL.createObjectURL(event.target!.files[0]));
  };

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Submit button clicked!");

    axios.post("http://localhost:4000/image-upload", {
      //axios post request
      value: "Hello World!",
    });
  };

  return (
    <div id="Imageloader">
      <div id="form">
        <h2>Insert a Image</h2>
        <input type="file" id="input Image" onChange={onImageChange} />
        <button onClick={onSubmit}>Submit</button>
      </div>
      <img src={image && image} id="displayImage" />
    </div>
  );
};
