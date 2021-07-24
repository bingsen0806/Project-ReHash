import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDEtU9iHU6zDSCB0De42EH4CPhh_WDZcm8",
  authDomain: "projectrehash-e91c0.firebaseapp.com",
  projectId: "projectrehash-e91c0",
  storageBucket: "projectrehash-e91c0.appspot.com",
  messagingSenderId: "882668693176",
  appId: "1:882668693176:web:1462615739f6878eed364d",
  measurementId: "G-DNDTB5D3WW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
