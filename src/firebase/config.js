import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_CONFIG_APIKEY,

  authDomain: 'firegram-0.firebaseapp.com',

  projectId: 'firegram-0',

  storageBucket: 'firegram-0.appspot.com',

  messagingSenderId: process.env.REACT_FIREBASE_CONFIG_SENDERID,

  appId: process.env.REACT_FIREBASE_CONFIG_APPID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getFirestore(firebaseApp);

const db = getFirestore();

export { storage, db };
