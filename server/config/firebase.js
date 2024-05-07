// Corregir la importación de 'initializeApp'
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {

}

// Usar el nombre correcto 'initializeApp' aquí
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
