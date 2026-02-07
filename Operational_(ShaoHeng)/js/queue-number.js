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



import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function loadOrderDetails() {
    const selectedHC = localStorage.getItem("lastHC");
    const stallId = localStorage.getItem("lastStallId");

    if (!selectedHC || !stallId) {
        console.error("Missing Hawker Centre or Stall ID in localStorage.");
        return;
    }

    const manualOrderId = "Order#01"; 
    const orderRef = doc(db, "hawker centre", selectedHC, "food stalls", stallId, "orders", manualOrderId);
    
    try {
        const docSnap = await getDoc(orderRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            console.log("Found manual order data:", data);

            document.getElementById('display-queue-number').innerText = data.QueueNumber || "---";
            document.getElementById('order-status').innerText = `${data.Status || 'N/A'}`;

            const container = document.getElementById('order-items-container');
            let htmlContent = `
              <h3>
                  Food Stall: ${localStorage.getItem("lastStallId") || 'N/A'}<br>
                  Stall ID: ${data.StallID || 'N/A'}<br>
                  (${data.DiningOption})
              </h3>
            `;

            if (data.OrderItems && Array.isArray(data.OrderItems)) {
                data.OrderItems.forEach((item, index) => {
                    htmlContent += `
                      <div class="item-row">
                          <h3>Order Item (${index + 1}): ${item.name}</h3>
                          <h3 class="order-item-detail">
                              size - ${item.size}<br>
                              qty - x${item.qty}
                          </h3>
                          <h3 class="order-item-price">$${Number(item.price).toFixed(2)}</h3>
                      </div>
                      <hr>
                    `;
                });
            }

            htmlContent += `
              <h3>Sub Total: $${data.TotalPrice || '0.00'}</h3>
              <h3>Payment Method: ${data.PaymentMethod}</h3>
            `;

            container.innerHTML = htmlContent;
            
        } else {
            console.error(`Could not find document named "${manualOrderId}" at path: hawker centre/${selectedHC}/food stalls/${stallId}/orders/`);
        }
    } catch (error) {
        console.error("Error fetching order:", error);
    }
}

document.querySelector('.cancel-order-button').addEventListener('click', async () => {
    const selectedHC = localStorage.getItem("lastHC");
    const stallId = localStorage.getItem("lastStallId");
    const manualOrderId = "Order#01";

    if (confirm("Are you sure you want to cancel this manual order?")) {
        const orderRef = doc(db, "hawker centre", selectedHC, "food stalls", stallId, "orders", manualOrderId);
        try {
            await updateDoc(orderRef, { Status: "Cancelled" });
            alert("Order Cancelled.");
            window.location.href = "../../UserAccMgmt_(YiKai)/pages/home-customer.html";
        } catch (e) {
            alert("Error updating manual order. Check your Firebase permissions.");
        }
    }
});

loadOrderDetails();