import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyD_jr_1XXUEFF67fIVngCM5doxExrbvjhM",
    authDomain: "ouranos-5ad1e.firebaseapp.com",
    databaseURL: "https://ouranos-5ad1e-default-rtdb.firebaseio.com",
    projectId: "ouranos-5ad1e",
    storageBucket: "ouranos-5ad1e.appspot.com",
    messagingSenderId: "426815933674",
    appId: "1:426815933674:web:4243c7e6c6ee2966a21b93",
    measurementId: "G-HT62BXMYVD",
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);


export const storage = getStorage(app); // Initialize Firebase Storage



export default app;
