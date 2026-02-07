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



import { collection, onSnapshot, query } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function initDashboard() {
    const selectedHC = localStorage.getItem("lastHC");
    const stallId = localStorage.getItem("lastStallId");
    
    document.getElementById('stall-name-display').innerText = `Food Stall: ${stallId}`;

    if (!selectedHC || !stallId) return;

    const ordersRef = collection(db, "hawker centre", selectedHC, "food stalls", stallId, "orders");

    onSnapshot(ordersRef, (snapshot) => {
        const receivedDiv = document.getElementById('list-received');
        const preparingDiv = document.getElementById('list-preparing');
        const completeDiv = document.getElementById('list-complete');
        
        receivedDiv.innerHTML = "";
        preparingDiv.innerHTML = "";
        completeDiv.innerHTML = "";

        snapshot.forEach((doc) => {
            const order = doc.data();
            const queueNumHTML = `<h2 class="queue-number-item">${order.QueueNumber}</h2>`;

            if (order.Status === "Received") {
                receivedDiv.innerHTML += queueNumHTML;
            } else if (order.Status === "Preparing") {
                preparingDiv.innerHTML += queueNumHTML;
            } else if (order.Status === "Complete") {
                completeDiv.innerHTML += queueNumHTML;
            }
        });
    });
}

initDashboard();