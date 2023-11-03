import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./ImageGallery.css";

function ImageGallery({ images, addImages }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageOrder, setImageOrder] = useState(
    images.map((image, index) => `${image.id}`)
  );
  const [popupMessage, setPopupMessage] = useState(null);
  const [showGalleryText, setShowGalleryText] = useState(true);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(imageOrder);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);

    // Insert the dragged item at the correct position based on the destination index
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImageOrder(reorderedImages);
  };

  const toggleImageSelection = (event, imageId) => {
    const isChecked = event.target.checked;
    console.log(`Image ${imageId} isChecked: ${isChecked}`);

    setSelectedImages((prevSelectedImages) => {
      if (isChecked) {
        console.log(`Selecting Image ${imageId}`);
        setShowGalleryText(false); // Hide the "Gallery" text
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

  const showPopup = (message) => {
    setPopupMessage(message);

    setTimeout(() => {
      setPopupMessage(null);
    }, 2000);
    console.log("Popup message set:", message);
  };

  const deleteSelectedImages = () => {
    if (selectedImages.length === 0) {
      showPopup("Select at least one image");
      return;
    }

    setImageOrder((prevImageOrder) => {
      const deletedImageIds = prevImageOrder.filter((imageId) =>
        selectedImages.includes(imageId)
      );

      console.log("Deleted Image IDs:", deletedImageIds);

      const updatedOrder = prevImageOrder.filter(
        (imageId) => !selectedImages.includes(imageId)
      );
      setSelectedImages([]);

      const message = `${deletedImageIds.length} files deleted`;
      showPopup(message);

      return updatedOrder;
    });
  };

  return (
    <>
      <div className="container">
        <div className="upper-container">
          {showGalleryText ? (
            <h2 className="gallery-text">Gallery</h2>
          ) : (
            <div className="delete-text">
              <h3>
                {" "}
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectedImages.length > 0}
                  onChange={() => {
                    // Toggle the selection status of all images based on the checkbox
                    const selectAll = selectedImages.length === 0;
                    setSelectedImages(selectAll ? imageOrder : []);
                  }}
                />{" "}
                {selectedImages.length} Files Selected
              </h3>
              <h4 onClick={deleteSelectedImages}>Delete Files</h4>
            </div>
          )}
        </div>
        <hr />
        <div className="lower-container">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable type="ROW" droppableId="gallery">
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
                            className={index === 0 ? "first-image" : ""} // Add the class conditionally
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
                  <img
                    className="addImage"
                    src={addImages[0].image}
                    alt="Add "
                  />
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          {/* popup code */}
          {popupMessage && <div className="popup">{popupMessage}</div>}
        </div>
      </div>
    </>
  );
}

export default ImageGallery;
