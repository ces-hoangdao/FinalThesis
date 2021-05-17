import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";

const UpLoadImg = ({ house, setHouse }) => {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");

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
 
  return (
    <div>
      <form>
        <label>List Images</label>
        <input type="file" onChange={changeHandler}></input>

        <div className="">
          {error && <div className="errorMessage">{error}</div>}
          {files && <div>{files.name}</div>}
          {files && <ProgressBar files={files} setFiles={setFiles} />}
          {image && (
            <motion.div className="" layout whileHover={{ opacity: 1 }}>
              <motion.img
                src={image}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpLoadImg;
