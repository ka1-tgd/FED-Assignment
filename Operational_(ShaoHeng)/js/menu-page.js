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



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadFoods() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedHC = urlParams.get('hc');
    const stallId = urlParams.get('stallId');
    
    const container = document.getElementById('foodsContainer');

    try {
        const menuRef = collection(db, "hawker centre", selectedHC, "food stalls", stallId, "food items");
        const querySnapshot = await getDocs(menuRef);

        if (querySnapshot.empty) {
            container.innerHTML = "<h2>No food items found here.</h2>";
            return;
        }

        let html = "";

        querySnapshot.forEach((doc) => {
            const food = doc.data();
            
            html += `
                <a class="flex-fooditem" href="ordering-page.html?foodName=${encodeURIComponent(food.FoodItemName)}" style="text-decoration: none;">
                    <h3>${food.FoodItemName}</h3>
                    <img class="food-img" src="${food.FoodImg || '../ASSGtesting.png'}">
                    <p>Rating: ${food.Rating}</p>
                    <p>Price: $${food.Price}</p>
                </a>
            `;
        });

        container.innerHTML = html;

    } catch (error) {
        console.error("Error loading menu:", error);
        container.innerHTML = "<h2>Error loading data. Check console.</h2>";
    }
}

loadFoods();