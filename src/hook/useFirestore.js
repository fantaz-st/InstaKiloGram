import { useState, useEffect } from 'react';

import { collection, query, onSnapshot } from '@firebase/firestore';

import { db } from '../firebase/config';

const useFirestore = (collect) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, collect));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let images = [];
      querySnapshot.forEach((doc) => {
        images.push({ ...doc.data(), id: doc.id });
      });
      setDocs(images);
    });

    return () => unsubscribe();
  }, [collect]);

  return { docs };
};

export default useFirestore;
