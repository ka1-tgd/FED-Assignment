import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { getFirestore, collection, getDocs, query, where } from
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



let basePrice = 0;
let currentQuantity = 1;

async function initOrderPage() {
    const selectedHC = localStorage.getItem("lastHC");
    const stallId = localStorage.getItem("lastStallId");
    const foodName = localStorage.getItem("selectedFood");

    console.log("Debug Info:", { selectedHC, stallId, foodName });

    if (!foodName || !selectedHC || !stallId) {
        console.error("Missing data in localStorage! Check if menu-page.js saved them.");
        return;
    }

    const title = document.querySelector('.order-item-block h3');
    if (title) title.textContent = foodName;

    try {
        console.log(`Searching path: hawker centre / ${selectedHC} / food stalls / ${stallId} / food items`);
        
        const menuRef = collection(db, "hawker centre", selectedHC, "food stalls", stallId, "food items");
        const q = query(menuRef, where("FoodItemName", "==", foodName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            basePrice = Number(data.Price);
            console.log("Success! Base Price found:", basePrice);
            updateTotal();
            renderPreviousItems();
        } else {
            console.error("No matching food found. Is 'FoodItemName' spelled exactly the same in Firebase?");
        }
    } catch (error) {
        console.error("Firebase Error:", error);
    }
}

window.changeQuantity = function(amount) {
    currentQuantity += amount;
    if (currentQuantity < 1) currentQuantity = 1;   //Minimum 1 food item!!!//
    document.getElementById('quantity-display').textContent = currentQuantity;
    updateTotal();
};

function updateTotal() {
    let extra = 0;
    if (document.getElementById('up-size')?.checked) extra += 0.30;
    if (document.getElementById('bio-box')?.checked) extra += 0.20;
    if (document.getElementById('byo')?.checked) extra -= 0.10;

    const currentItemTotal = (basePrice + extra) * currentQuantity;
    const masterCart = JSON.parse(localStorage.getItem("masterCart")) || [];
    let cartTotal = 0;
    
    masterCart.forEach(item => {
        const priceNum = parseFloat(item.total.replace(/[^0-9.-]+/g, "")) || 0;
        cartTotal += priceNum;
    });

    const grandTotal = currentItemTotal + cartTotal;
    const itemPriceTag = document.querySelector('#current-item-customization .item-price');
    const subTotalTag = document.querySelector('.sub-total h3');

    if (itemPriceTag) {
        itemPriceTag.textContent = `Cost: $${currentItemTotal.toFixed(2)}`;
    }
    if (subTotalTag) {
        subTotalTag.textContent = `Sub Total: $${grandTotal.toFixed(2)}`;
    }
}

document.addEventListener('change', (event) => {
    if (event.target.type === 'radio') updateTotal();
});

initOrderPage();

const addItemBtn = document.querySelector('.add-item-button');

if (addItemBtn) {
    addItemBtn.addEventListener('click', () => {
        const foodName = document.querySelector('.order-item-block h3').textContent;
        const qty = document.getElementById('quantity-display').textContent;
        const price = document.querySelector('.item-price').textContent;

        const newItem = { name: foodName, quantity: qty, total: price };
        let masterCart = JSON.parse(localStorage.getItem("masterCart")) || [];
        masterCart.push(newItem);
        localStorage.setItem("masterCart", JSON.stringify(masterCart));

        const hc = localStorage.getItem("lastHC");
        const stall = localStorage.getItem("lastStallId");
        window.location.href = `menu-page.html?hc=${hc}&stallId=${stall}`;
    });
}

const finalOrderBtn = document.querySelector('.place-order-button');

if (finalOrderBtn) {
    finalOrderBtn.addEventListener('click', (e) => {
        e.preventDefault(); 

        const foodName = document.querySelector('.order-item-block h3').textContent;
        const qty = document.getElementById('quantity-display').textContent;
        const price = document.querySelector('.item-price').textContent;

        const lastItem = { name: foodName, quantity: qty, total: price };

        let masterCart = JSON.parse(localStorage.getItem("masterCart")) || [];
        masterCart.push(lastItem);
        localStorage.setItem("masterCart", JSON.stringify(masterCart));

        window.location.href = "queue-number.html";
    });
}



function renderPreviousItems() {
    const container = document.getElementById('cart-items-container');
    const masterCart = JSON.parse(localStorage.getItem("masterCart")) || [];
    
    // Clear the container first so we don't double-render
    container.innerHTML = ""; 

    masterCart.forEach((item, index) => {
        const itemBlock = document.createElement('div');
        itemBlock.className = 'order-item-block';
        itemBlock.innerHTML = `
            <div style="min-width: 240px;">
                <h3>${item.name}</h3>
                <button onclick="removeItem(${index})" style="background-color: red; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Remove</button>
            </div>
            <p>Quantity: ${item.quantity}</p>
            <h4 class="item-price">${item.total}</h4>
        `;
        container.appendChild(itemBlock);
    });
}

window.removeItem = function(index) {
    let masterCart = JSON.parse(localStorage.getItem("masterCart")) || [];
    masterCart.splice(index, 1);
    localStorage.setItem("masterCart", JSON.stringify(masterCart));
    renderPreviousItems();
    updateTotal();
};

renderPreviousItems();