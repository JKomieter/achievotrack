const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
require("dotenv").config();

const firebaseConfig = {
    apiKey: "AIzaSyDTK7PwzIpfnBT3sethvp3O0ruwfxJFfiQ",
    authDomain: "achtrack-dd321.firebaseapp.com",
    projectId: "achtrack-dd321",
    storageBucket: "achtrack-dd321.appspot.com",
    messagingSenderId: "531425135944",
    appId: "1:531425135944:web:8d4c4f3c6e68b45b26b77d",
    measurementId: "G-9VBYNGCN5Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = { db, auth, storage };
