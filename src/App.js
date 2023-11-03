import React from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery";

const App = () => {
  const images = [
    { id: 1, image: "https://i.ibb.co/8m4XDPK/image-1.webp" },
    { id: 2, image: "https://i.ibb.co/wcVnv6r/image-2.webp" },
    { id: 3, image: "https://i.ibb.co/LrKRXnJ/image-3.webp" },
    { id: 4, image: "https://i.ibb.co/3dHsBqG/image-4.webp" },
    { id: 5, image: "https://i.ibb.co/hYcgTPY/image-5.webp" },
    { id: 6, image: "https://i.ibb.co/2Y0nZZP/image-6.webp" },
    { id: 7, image: "https://i.ibb.co/W6h9fCj/image-7.webp" },
    { id: 8, image: "https://i.ibb.co/fSqyK6N/image-8.webp" },
    { id: 9, image: "https://i.ibb.co/kxZhRkw/image-9.webp" },
    { id: 10, image: "https://i.ibb.co/DpqQcPX/image-10.jpg" },
    { id: 11, image: "https://i.ibb.co/0DM4B4q/image-11.jpg" },
    // { id: 12, image: "https://i.ibb.co/tX6Yr10/add-image.webp" },
  ];

  const addImages = [
    {
      image: "https://i.ibb.co/tX6Yr10/add-image.webp",
    },
  ];

  return (
    <>
      <ImageGallery images={images} addImages={addImages} />
    </>
  );
};

export default App;
