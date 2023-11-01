import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./ImageGallery.css";

function ImageGallery({ images }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageOrder, setImageOrder] = useState(
    images.map((image, index) => `${image.id}`)
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(imageOrder);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImageOrder(reorderedImages);
  };

  const toggleImageSelection = (event, imageId) => {
    const isChecked = event.target.checked;
    console.log(`Image ${imageId} isChecked: ${isChecked}`);

    setSelectedImages((prevSelectedImages) => {
      if (isChecked) {
        console.log(`Selecting Image ${imageId}`);
        return [...prevSelectedImages, imageId];
      } else {
        console.log(`Deselecting Image ${imageId}`);
        const updatedSelection = prevSelectedImages.filter(
          (selectedImage) => selectedImage !== imageId
        );
        console.log(`Updated Selection:`, updatedSelection);
        return updatedSelection;
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
        <h3>{selectedImages.length} Files Selected</h3>
        <h4 onClick={deleteSelectedImages}>Delete Files</h4>
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
                const isChecked = selectedImages.includes(imageId);

                return (
                  <Draggable
                    key={imageId}
                    draggableId={imageId.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="image-container">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(event) =>
                              toggleImageSelection(event, imageId)
                            }
                          />
                          <img
                            src={image.image}
                            alt={image.image}
                            className={isChecked ? "selected" : ""}
                          />
                        </div>
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
