// 1. Get Elements
const pointsDisplay = document.getElementById('point-balance');

// 2. Set Points (Fixed at 450 as requested)
// We check if points exist in storage; if not, we set them to 450.
let userPoints = parseInt(localStorage.getItem('ecoPoints'));

if (!userPoints) {
    userPoints = 450;
    localStorage.setItem('ecoPoints', userPoints);
}

// Update the header immediately
if (pointsDisplay) {
    pointsDisplay.innerText = userPoints;
}

// 3. REDEEM PAGE LOGIC
function redeemReward(cost, name) {
    if (userPoints >= cost) {
        userPoints -= cost;
        updateStorage();
        alert(`Success! You redeemed: ${name}`);
    } else {
        alert("Not enough points!");
    }
}

// Helper: Update Header & Storage
function updateStorage() {
    localStorage.setItem('ecoPoints', userPoints);
    if (pointsDisplay) {
        pointsDisplay.innerText = userPoints;
    }
}