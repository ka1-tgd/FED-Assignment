import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    query, 
    where, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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



window.selectFood = function(name) {
    localStorage.setItem('selectedFood', decodeURIComponent(name));
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadFoods() {
    const urlParams = new URLSearchParams(window.location.search);
    const container = document.getElementById('foodsContainer');
    const welcomeHeader = document.querySelector('.welcome-text');

    let selectedHC = urlParams.get('hc') || localStorage.getItem("lastHC");
    let stallId = urlParams.get('stallId') || localStorage.getItem("lastStallId");
    let stallName = localStorage.getItem("selectedStall");

    if (urlParams.get('hc')) localStorage.setItem("lastHC", selectedHC);
    if (urlParams.get('stallId')) localStorage.setItem("lastStallId", stallId);

    if (stallName && welcomeHeader) {
        welcomeHeader.textContent = `Welcome to ${decodeURIComponent(stallName)}`;
    }

    if (!selectedHC || !stallId) {
        container.innerHTML = "<h2>Error: No stall selected. Go back and try again.</h2>";
        return;
    }

    try {
        const menuRef = collection(db, "hawker centre", selectedHC, "food stalls", stallId, "food items");
        const querySnapshot = await getDocs(menuRef);

        if (querySnapshot.empty) {
            container.innerHTML = "<h2>No food items found for this stall.</h2>";
            return;
        }

        let html = "";
        querySnapshot.forEach((doc) => {
            const food = doc.data();
            const foodNameEscaped = encodeURIComponent(food.FoodItemName);
            
            html += `
                <a class="flex-fooditem" 
                   href="ordering-page.html?foodName=${foodNameEscaped}" 
                   onclick="selectFood('${foodNameEscaped}')"
                   style="text-decoration: none;">
                    
                    <h3>${food.FoodItemName}</h3>
                    <img class="food-img" src="${food.FoodImg || '../ASSGtesting.png'}" alt="${food.FoodItemName}">
                    <p>Rating: ${food.Rating || 'N/A'}</p>
                    <p>Price: $${food.Price ? Number(food.Price).toFixed(2) : '0.00'}</p>
                </a>
            `;
        });

        container.innerHTML = html;

    } catch (error) {
        console.error("Firebase Error:", error);
        container.innerHTML = "<h2>Error loading menu items.</h2>";
    }
}

loadFoods();