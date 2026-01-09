import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Substitua os valores abaixo pelos do seu projeto Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBiXcSZOnfQ5rn4DZBDi1oC2zQD9SK2wh0',
  authDomain: 'psify-1ee75.firebaseapp.com',
  databaseURL: 'https://psify-1ee75-default-rtdb.firebaseio.com',
  projectId: 'psify-1ee75',
  storageBucket: 'psify-1ee75.firebasestorage.app',
  messagingSenderId: '624902328860',
  appId: '1:624902328860:web:1727aad74115a349f5c5d9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
