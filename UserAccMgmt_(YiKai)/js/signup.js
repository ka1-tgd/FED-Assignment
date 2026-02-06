import { auth, db } from '../../Firebase/firebase.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

// register.html
const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Assign values
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;
    const userType = form.userType.value;

    // Check password
    if (confirmPassword !== password) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            role: userType,
            createdAt: new Date()
        });

        alert("Account created successfully!")

        // Redirect to login page
        console.log("Redirecting to login.html")
        window.location.href = "login.html"
    }
    
    catch (error) {
        console.error(error);
        alert(error.message);
    }
});