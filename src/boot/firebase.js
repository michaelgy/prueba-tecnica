import { boot } from "quasar/wrappers";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeelNyILZgdKyhAf8khOZyk3AgbmRRH40",
  authDomain: "pruebatecnica-halterofilia.firebaseapp.com",
  projectId: "pruebatecnica-halterofilia",
  storageBucket: "pruebatecnica-halterofilia.appspot.com",
  messagingSenderId: "396387532389",
  appId: "1:396387532389:web:01ea29f9f2d433a52a508c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$firebase = firebaseApp;
  // ^ ^ ^ this will allow you to use this.$firebase (for Vue Options API form)
  //       so you won't necessarily have to import firebase in each vue file

  app.config.globalProperties.$firebase = firestore;
});

export { firebaseApp, firestore };
