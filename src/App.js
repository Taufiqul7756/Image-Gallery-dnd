import "./App.css";
import ImageGallery from "./components/ImageGallery";

import data from "./components/data/data.json";

const App = () => {
  const addImages = [
    {
      image: "https://i.ibb.co/tX6Yr10/add-image.webp",
    },
  ];

  const featured = [{ id: 1, image: "https://i.ibb.co/8m4XDPK/image-1.webp" }];

  return (
    <>
      <ImageGallery images={data} addImages={addImages} featured={featured} />
    </>
  );
};

export default App;
