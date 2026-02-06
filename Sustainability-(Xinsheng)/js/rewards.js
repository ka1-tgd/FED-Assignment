// 1. Setup Variables
let userPoints = 450;
const pointsDisplay = document.getElementById('point-balance');
const statusText = document.getElementById('status-text');
const toggleBtn = document.getElementById('eco-toggle');
const bonusBox = document.getElementById('bonus-box');

// 2. Redemption Logic
function redeemReward(cost, rewardName) {
    if (userPoints >= cost) {
        // Subtract points
        userPoints = userPoints - cost;
        
        // Update the screen
        pointsDisplay.innerText = userPoints;
        
        // Success Message
        alert(`Success! You have redeemed: ${rewardName}`);
    } else {
        // Failure Message
        alert("Sorry, you do not have enough points for this reward.");
    }
}

// 3. Toggle Logic (Sustainability Feature)
toggleBtn.addEventListener('click', function() {
    // Check if currently active
    const isEcoMode = statusText.classList.contains('active');

    if (!isEcoMode) {
        // Switch to Active
        statusText.innerText = "Eco-Boost Active (2x Points!)";
        statusText.classList.add('active');
        toggleBtn.innerText = "Deactivate Eco-Mode";
        
        // Optional: Change border color to show active state
        bonusBox.style.borderColor = "#2d6a4f"; 
        bonusBox.style.backgroundColor = "#e8f5e9";
    } else {
        // Switch back to Standard
        statusText.innerText = "Standard";
        statusText.classList.remove('active');
        toggleBtn.innerText = "Activate Eco-Mode";
        
        // Reset styles
        bonusBox.style.borderColor = "#74c69d";
        bonusBox.style.backgroundColor = "#ffffff";
    }
});