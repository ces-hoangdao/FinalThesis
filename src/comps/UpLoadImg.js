import React, { useState, useEffect } from "react";
import ProgressBarList from "./ProgressBarList";


const UpLoadImg = ({ house, setHouse }) => {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const types = ["image/png", "image/jpeg", "image/jpg"];
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFiles(selected);
      setError("");
    } else {
      setFiles(null);
      setError("Please check type of image file(png/jpeg/jpg)");
    }
  };
  useEffect(() => {
    if (images) {
      setHouse({ ...house, images: images });
    }
  }, [images]);

  return (
    <div>
      <form>
        <label>List Images</label>
        <input type="file" onChange={changeHandler}></input>

        <div className="">
          {error && <div className="errorMessage">{error}</div>}
          {files && <div>{files.name}</div>}
          {files && (
            <ProgressBarList
              files={files}
              setFiles={setFiles}
              images={images}
              setImages={setImages}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpLoadImg;
