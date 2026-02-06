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



loadStalls();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadStalls() {
    const selectedHC = localStorage.getItem("selectedHawker");
    const container = document.getElementById('stallsContainer');
    const header = document.getElementById('welcomeHeader');

    if (!selectedHC) {
        header.textContent = "No Hawker Centre Selected";
        return;
    }

    header.textContent = `Welcome to ${selectedHC}`;

    try {
        const stallsRef = collection(db, "hawker centre", selectedHC, "food stalls");
        
        const querySnapshot = await getDocs(stallsRef);
        
        let stallsHTML = "";

        if (querySnapshot.empty) {
            container.innerHTML = "<h2>No stalls found for this location.</h2>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            stallsHTML += `
                <a class="flex-stall" href="menu-page.html?hc=${encodeURIComponent(selectedHC)}&stallId=${doc.id}" style="text-decoration: none;">
                    <h3>${data.StallName}</h3>
                    <img class="stall-img" src="${data.StallImg || '../ASSGtesting.png'}" alt="${data.StallName}">
                    <p>Cuisine: ${data.Cuisine}</p>
                    <p>Rating: ${data.Rating}</p>
                    <p>Hygiene Grade: ${data.HygieneGrade}</p>
                </a>
            `;
        });
        
        container.innerHTML = stallsHTML;

    } catch (error) {
        console.error("Firebase Error:", error);
        container.innerHTML = "<p>Error loading stalls. Check console for details.</p>";
    }
}

loadStalls();