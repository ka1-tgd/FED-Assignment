import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { getStorage } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// 🔥 Shared Firebase configuration (same for whole group)
const firebaseConfig = {
  apiKey: "AIzaSyA195BcBHD4qQu4RrjauxiY8QWYLxNPI1Q",
  authDomain: "fedassignment-4d7df.firebaseapp.com",
  databaseURL: "https://fedassignment-4d7df-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fedassignment-4d7df",
  storageBucket: "fedassignment-4d7df.firebasestorage.app",
  messagingSenderId: "980794763139",
  appId: "1:980794763139:web:d8fe74ec6639b871acb8b6",
  measurementId: "G-9087WHK9SV"
};

// 🔥 Initialize ONCE
const app = initializeApp(firebaseConfig);

// 🔁 Export shared services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);