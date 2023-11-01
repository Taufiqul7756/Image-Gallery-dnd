import "./App.css";
import ImageGallery from "./components/ImageGallery";
import img1 from "./images/image-1.webp";
import img2 from "./images/image-2.webp";
import img3 from "./images/image-3.webp";
import img4 from "./images/image-4.webp";
import img5 from "./images/image-5.webp";
import img6 from "./images/image-6.webp";
import img7 from "./images/image-7.webp";
import img8 from "./images/image-8.webp";
import img9 from "./images/image-9.webp";
import img10 from "./images/image-10.jpeg";
import img11 from "./images/image-11.jpeg";

function App() {
  const images = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
    { id: 7, image: img7 },
    { id: 8, image: img8 },
    { id: 9, image: img9 },
    { id: 10, image: img10 },
    { id: 11, image: img11 },
  ];
  return (
    <>
      <ImageGallery images={images} />
    </>
  );
}

export default App;
