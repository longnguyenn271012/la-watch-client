// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ8COqOvbWRtK28FCaBQsnw-9AYsJf3Y4",
  authDomain: "watch-shop-57ae8.firebaseapp.com",
  projectId: "watch-shop-57ae8",
  storageBucket: "watch-shop-57ae8.appspot.com",
  messagingSenderId: "54406556067",
  appId: "1:54406556067:web:a8521c5d9092a943bb1216",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;
