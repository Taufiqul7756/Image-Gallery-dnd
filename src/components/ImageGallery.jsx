import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./ImageGallery.css";

function ImageGallery({ images }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageOrder, setImageOrder] = useState(
    images.map((image, index) => `${image.id}`)
  );

  console.log("Imahaaaaaa", images);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(imageOrder);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImageOrder(reorderedImages);
  };

  const toggleImageSelection = (image) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(image)) {
        return prevSelectedImages.filter(
          (selectedImage) => selectedImage !== image
        );
      } else {
        return [...prevSelectedImages, image];
      }
    });
  };

  const deleteSelectedImages = () => {
    setImageOrder((prevImageOrder) => {
      const updatedOrder = prevImageOrder.filter(
        (imageId) => !selectedImages.includes(imageId)
      );
      setSelectedImages([]);
      return updatedOrder;
    });
  };

  return (
    <div>
      <div className="upper-container">
        <span>{selectedImages.length} Files Selected</span>
        <button onClick={deleteSelectedImages}>Delete Selected Images</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="gallery">
          {(provided) => (
            <ul
              className="img-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {imageOrder.map((imageId, index) => {
                const image = images.find(
                  (img) => img.id === parseInt(imageId, 10)
                );
                return (
                  <Draggable key={imageId} draggableId={imageId} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={image.image}
                          alt={image.image}
                          className={
                            selectedImages.includes(imageId) ? "selected" : ""
                          }
                          onClick={() => toggleImageSelection(imageId)}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ImageGallery;
