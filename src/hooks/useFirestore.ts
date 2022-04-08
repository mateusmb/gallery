import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collectionName: string) => {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(projectFirestore, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      documents.sort((a, b) => b.createdAt - a.createdAt);
      setDocs(documents);
    });
    return (): void => {
      unsubscribe();
    };
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
