/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import "./ImageGallery.css";

const ImageGalleryNew = ({ images, addImages, featured }) => {
  const [items, setItems] = useState(images);

  const [showGalleryText, setShowGalleryText] = useState(true);
  const [boxesPerRow, setBoxesPerRow] = useState(5);
  const [rowHeight, setRowHeight] = useState(259.5);

  const updateGridSettings = () => {
    if (window.innerWidth <= 600) {
      setBoxesPerRow(2);
      setRowHeight(150);
    } else if (window.innerWidth <= 900) {
      setBoxesPerRow(3);
      setRowHeight(200);
    } else {
      setBoxesPerRow(5);
      setRowHeight(259.5);
    }
  };

  useEffect(() => {
    updateGridSettings();
    window.addEventListener("resize", updateGridSettings);
    return () => {
      window.removeEventListener("resize", updateGridSettings);
    };
  }, []);

  // console.log("addImages", addImages);
  console.log("images", images);

  const handleCheckboxChange = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        item.selected = !item.selected;
      }
      return item;
    });
    setItems(updatedItems);

    const anyImageSelected = updatedItems.some((item) => item.selected);
    setShowGalleryText(!anyImageSelected);
    console.log("Selected Image : ", anyImageSelected);
  };

  const deleteSelectedImages = () => {
    const updatedItems = items.filter((item) => !item.selected);
    console.log(
      "Deleted Images:",
      items.filter((item) => item.selected)
    );
    console.log("Updated Image Order:", updatedItems);
    setItems(updatedItems);
  };
  function onChange(sourceId, sourceIndex, targetIndex) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }
  const selectedCount = items.filter((item) => item.selected).length;

  return (
    <>
      <div className="container">
        <div className="upper-container">
          {showGalleryText ? (
            <h2 className="gallery-text">Gallery</h2>
          ) : (
            <div className="select-delete-text delete-text">
              <h3>
                <input
                  type="checkbox"
                  id="selectAllCheckbox"
                  className="upper-checkbox"
                  checked={selectedCount > 0}
                  onChange={() => {
                    const selectAll = selectedCount === 0;
                    const updatedItems = items.map((item) => {
                      item.selected = selectAll;
                      return item;
                    });
                    setItems(updatedItems);
                    setShowGalleryText(!selectAll);
                  }}
                />{" "}
                {selectedCount} File{selectedCount > 1 ? "s" : ""} Selected
              </h3>
              <h4 onClick={deleteSelectedImages}>Delete Files</h4>
            </div>
          )}
        </div>
        <hr className="hr" />
        <div className="lower-container">
          <GridContextProvider onChange={onChange}>
            <GridDropZone
              id="items"
              // boxesPerRow={5}
              // rowHeight={259.5}
              // style={{ height: 280 * Math.ceil(items.length / 4) }}
              boxesPerRow={boxesPerRow}
              rowHeight={rowHeight}
              style={{
                height: rowHeight * Math.ceil(items.length / boxesPerRow),
              }}
            >
              {items.map((item, index) => (
                <GridItem
                  key={item.id}
                  alt={`Image ${item.id}`}
                  className={`gridItem-image ${
                    item.selected ? "selected-image" : ""
                  } ${item.id === 12 ? "featured-image" : ""}`}
                >
                  <div className="image-container">
                    {item.id !== 12 ? ( // Check if the item is not the last image
                      <input
                        type="checkbox"
                        id={`checkbox-${item.id}`}
                        checked={item.selected}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="checkbox"
                      />
                    ) : null}
                    <img
                      src={item.image}
                      alt={`Image ${item.id}`}
                      className={`img-label${
                        item.id === 12 ? " featured-image" : ""
                      }`}
                    />
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
          </GridContextProvider>
        </div>
      </div>
    </>
  );
};

export default ImageGalleryNew;
