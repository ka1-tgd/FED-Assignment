import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    query, 
    where, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



async function checkHawker() {
    const inputVal = document.getElementById('hawkerInput').value.trim();
    
    if (!inputVal) {
        alert("Please enter a name!");
        return;
    }

    const hawkersRef = collection(db, "hawker centre");
    const q = query(hawkersRef, where("HCname", "==", inputVal));

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const hawkerData = querySnapshot.docs[0].data();
            localStorage.setItem("selectedHawker", inputVal);
            
            window.location.href = '../html/food-stalls-page.html';
        } else {
            alert("Hawker Centre Not Found! Check your spelling.");
        }
    } catch (error) {
        console.error("Firebase Error:", error);
        alert("An error occurred. Please check the console.");
    }
}

document.getElementById('goBtn').addEventListener('click', checkHawker);



async function loadSuggestions() {
    const datalist = document.getElementById('hawkerOptions');
    const hawkersRef = collection(db, "hawker centre");

    try {
        const querySnapshot = await getDocs(hawkersRef);
        querySnapshot.forEach((doc) => {
            const name = doc.data().HCname;
            const option = document.createElement('option');
            option.value = name;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading suggestions:", error);
    }
}

loadSuggestions();