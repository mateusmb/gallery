import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const PhotoUploadForm: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<String | null>(null);

  const allowedFileTypes = ["image/png", "image/jpeg"];

  const uploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const fileSelected = event.currentTarget.files[0];
      if (allowedFileTypes.includes(fileSelected.type)) {
        setFile(fileSelected);
        setError(null);
      } else {
        setFile(undefined);
        setError("Please select an image file (png or jpeg)");
      }
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={uploadPhoto} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile}/>}
      </div>
    </form>
  );
};

export default PhotoUploadForm;
