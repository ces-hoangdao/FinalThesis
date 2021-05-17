import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";

const ProgressBarForHost = ({ file, setFile, hostInfo, setHostInfo }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      setHostInfo({ ...hostInfo, IdImage: url.toString() });
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
      
    />
  );
};

export default ProgressBarForHost;
