import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeT2B9sgmnWYJwU6W7FazAxxaJw0Si10E",
  authDomain: "rn-movieclone.firebaseapp.com",
  projectId: "rn-movieclone",
  storageBucket: "rn-movieclone.appspot.com",
  messagingSenderId: "537622975213",
  appId: "1:537622975213:web:bd643b12af983b3d7872e4",
};

const app = initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);

export { app, authService, dbService };
