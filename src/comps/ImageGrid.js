import React from "react";
import { motion } from "framer-motion";

const ImageGrid = ({ house }) => {
  return (
    <div className="images-grid">
      {house &&
        house.map((image, index) => {
          return (
            <motion.div
              className="images-wrap"
              key={index}
              layout
              whileHover={{ opacity: 1 }}
              s
            >
              <motion.img
                src={image}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          );
        })}
    </div>
  );
};

export default ImageGrid;
