import "./App.css";
import ImageGallery from "./components/ImageGallery";

import data from "./components/data/data.json";

const App = () => {
  const addImages = [
    {
      image: "https://i.ibb.co/tX6Yr10/add-image.webp",
    },
  ];

  return (
    <>
      <ImageGallery images={data} addImages={addImages} />
    </>
  );
};

export default App;
