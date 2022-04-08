import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import useStorage from "../hooks/useStorage";

interface IProps {
  file: File;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

const ProgressBar: React.FC<IProps> = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(undefined);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
