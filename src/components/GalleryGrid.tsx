import { motion } from "framer-motion";
import React from "react";
import useFirestore from "../hooks/useFirestore";

interface IProps {
  setSelectedPhoto: React.Dispatch<React.SetStateAction<string>>;
}

const GalleryGrid: React.FC<IProps> = ({ setSelectedPhoto }) => {
  const { docs } = useFirestore("images");

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc: any) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            onClick={() => setSelectedPhoto(doc.url)}
            whileHover={{ opacity: 1 }}
            layout
          >
            <motion.img
              src={doc.url}
              alt="uploaded photo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default GalleryGrid;
