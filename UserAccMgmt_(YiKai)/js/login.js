import { auth, db } from '../../Firebase/firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

// login-customer.html and login-hawker.html
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", async () => {
    // Assign values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Authenticate
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user

        // Get role
        const userDoc = await getDoc(doc(db, "users", user.uid));

        // Check if user exists
        if (!userDoc.exists()) {
            throw new Error("User not found!");
        }

        const role = userDoc.data().role;

        // Redirect to respective home pages
        if (role === "Customer") {
            window.location.href = "../../UserAccMgmt_(YiKai)/pages/home-customer.html";
        }
        else if (role === "Hawker") {
            window.location.href = "../../UserAccMgmt_(YiKai)/pages/home-hawker.html";
        }
        else {
            throw new Error("Invalid user role");
        }
    }

    catch (error) {
        errorMsg.textContent = error.message;
    }
});