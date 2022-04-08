import { doc, setDoc, Timestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  StorageError,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { projectStorage, projectFirestore } from "../firebase/config";

const useStorage = (file: File) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<StorageError | null>(null);
  const [url, setUrl] = useState<String | null>(null);

  useEffect(() => {
    const projectStorageRef = ref(projectStorage, file.name);

    const uploadTask = uploadBytesResumable(projectStorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const photoData = {
            url: downloadURL,
            createdAt: Timestamp.fromDate(new Date()),
          };
          setDoc(doc(projectFirestore, "images", uuidv4()), photoData);
          setUrl(downloadURL);
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
