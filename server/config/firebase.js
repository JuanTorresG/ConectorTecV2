// Corregir la importación de 'initializeApp'
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyB8a0mHOOsvVuvkLD8jZyCaz3sOrnr26iM",
  authDomain: "conectortec.firebaseapp.com",
  projectId: "conectortec",
  storageBucket: "conectortec.appspot.com",
  messagingSenderId: "1030783747368",
  appId: "1:1030783747368:web:597ee3f17cc0f96f1a3c1d"
}

// Usar el nombre correcto 'initializeApp' aquí
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
