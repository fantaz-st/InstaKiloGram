import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

import { db } from '../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const stor = getStorage();
    const uploadFile = async () => {
      const storageRef = ref(stor, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // const collectionRef = db.collection('images');

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          /* switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('all is ok');
          } */
        },
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            const createdAt = Timestamp.fromDate(new Date());
            await addDoc(collection(db, 'images'), { url, createdAt });
            setUrl(url);
          });
        }
      );
    };
    uploadFile();
  }, [file]);
  return { url, progress, error };
};

export default useStorage;
