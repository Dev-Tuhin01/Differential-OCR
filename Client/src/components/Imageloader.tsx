import React, { useState } from "react";
import "./Imageloader.css";

export const Imageloader = () => {
  const [image, setImage] = useState("");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore: Object is possibly 'null';
    console.log(URL.createObjectURL(event.target!.files[0]));
    // @ts-ignore: Object is possibly 'null';
    setImage(URL.createObjectURL(event.target!.files[0]));
  };

  return (
    <div id="Imageloader">
      <div id="form">
        <h2>Insert a Image</h2>
        <input type="file" id="input Image" onChange={onImageChange} />
        <button>Submit</button>
      </div>
      <img src={image && image} id="displayImage" />
    </div>
  );
};
