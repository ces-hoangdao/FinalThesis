import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";

const ProgressBarList = ({ files, setFiles, images, setImages }) => {
  const { progress, url } = useStorage(files);

  useEffect(() => {
    if (url) {
      setFiles(null);
      setImages([...images, url]);
    }
  }, [url, setFiles]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    />
  );
};

export default ProgressBarList;
