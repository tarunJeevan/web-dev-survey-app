import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Configuration of firebase project
const firebaseConfig = {
    apiKey: "AIzaSyD2RnishT97gI8MCggY0_xhVwgY7NlyNkE",
    authDomain: "survey-purdue.firebaseapp.com",
    projectId: "survey-purdue",
    storageBucket: "survey-purdue.appspot.com",
    messagingSenderId: "332326994310",
    appId: "1:332326994310:web:98bce7564de23273906c07",
    measurementId: "G-HVB0ZJFMNB"
  };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//exporting the whole application enough we may or may not need this later
//Todo remove if still redundant in final stages
export default app;