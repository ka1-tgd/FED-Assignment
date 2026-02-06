import { auth, db } from "../../Firebase/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// account.html
const userNameSpan = document.getElementById("userName");
const userEmailSpan = document.getElementById("userEmail");
const userTypeSpan = document.getElementById("userType");

const editBtn = document.getElementById("editButton");
const logoutBtn = document.getElementById("logOutButton");

let currentUserUID = null;

// Check login
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        // If no logged in user, go to log in page
        window.location.href = "../../UserAccMgmt_(YiKai)/login.html"
        return;
    }

    currentUserUID = user.uid;
    userEmailSpan.textContent = user.email;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
        const data = userDoc.data();
        userNameSpan.textContent = data.name || "Not set";
        userTypeSpan.textContent = data.role;
    }
});

// Edit name feature
editBtn.addEventListener("click", async () => {
    // Prompt for new name
    const newName = prompt("Enter your new name:");

    // If new name was not entered or does not contain any characters
    if (!newName || newName.trim() === "") {
        // Don't process new name
        return;
    }

    try {
        await updateDoc(doc(db, "users", currentUserUID), {
            name: newName.trim()
        });

        userNameSpan.textContent = newName.trim();
        alert("Name updated successfully!");
    }

    catch (error) {
        alert("Failed to update name!");
        console.error(error);
    }
})

// Log out feature
logoutBtn.addEventListener("click", async () => {
    try {
        // Log out
        await signOut(auth);

        alert("Logged out successfully!");

        // Redirect back to log in page
        window.location.href = "../login.html";
    }

    catch (error) {
        console.error(error);
        alert("Failed to log out. Please try again.")
    }
})