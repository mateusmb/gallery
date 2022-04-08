import { motion } from "framer-motion";
import React from "react";

interface IProps {
  selectedPhoto: string;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<string>>;
}

const Modal: React.FC<IProps> = ({ selectedPhoto, setSelectedPhoto }) => {
  const handleExitModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget.className === "backdrop") {
      setSelectedPhoto("");
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleExitModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        className="photo"
        src={selectedPhoto}
        alt="photo enlarged"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  );
};

export default Modal;
