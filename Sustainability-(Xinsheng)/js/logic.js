// 1. INITIALIZATION
// Check for saved points. If missing or "Loading...", force it to 200.
let storedPoints = localStorage.getItem('ecoPoints');
let userPoints;

if (!storedPoints || isNaN(storedPoints)) {
    userPoints = 200; // Force set to 200 as requested
    localStorage.setItem('ecoPoints', userPoints);
} else {
    userPoints = parseInt(storedPoints);
}

// Load History
let userHistory = JSON.parse(localStorage.getItem('ecoHistory')) || [];

// Update the Header Immediately
const pointsDisplay = document.getElementById('point-balance');
if (pointsDisplay) {
    pointsDisplay.innerText = userPoints;
}

// 2. REDEEM FUNCTION
function redeemReward(cost, name) {
    if (userPoints >= cost) {
        // Deduct Points
        userPoints -= cost;
        
        // Create Transaction Record
        const newTransaction = {
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            activity: `Redeemed ${name}`,
            points: -cost,
            status: "Used"
        };
        
        // Add to storage
        userHistory.unshift(newTransaction);
        saveAllData();
        
        alert(`Success! You redeemed: ${name}`);
        
        // Update Header
        if (pointsDisplay) pointsDisplay.innerText = userPoints;
        
        // Refresh page if we are on History page to show new row
        if(window.location.href.includes("history.html")) location.reload();
        
    } else {
        alert(`Insufficient Points! You need ${cost} points.`);
    }
}

// 3. CART / PACKAGING UPDATES
const basePrice = 5.00;
function updateTotal(adjustment, showQR) {
    const newTotal = (basePrice + adjustment).toFixed(2);
    const priceDisplay = document.getElementById('final-price');
    const qrSection = document.getElementById('qr-section');
    
    if(priceDisplay) priceDisplay.innerText = newTotal;
    if(qrSection) qrSection.style.display = showQR ? 'flex' : 'none';
}

function proceedToVerify() {
    const byoRadio = document.getElementById('byo-radio');
    if (byoRadio && byoRadio.checked) {
        location.href = 'verification.html';
    } else {
        alert("Order added to cart!");
        location.href = 'food-surplus.html';
    }
}

function addToCart(item) {
    alert("Added " + item + " to cart!");
}

// 4. SAVE DATA
function saveAllData() {
    localStorage.setItem('ecoPoints', userPoints);
    localStorage.setItem('ecoHistory', JSON.stringify(userHistory));
}

// 5. HISTORY TABLE RENDERER
const historyTableBody = document.getElementById('history-table-body');
if (historyTableBody) {
    // Add new real transactions to the top
    [...userHistory].reverse().forEach(item => {
        const row = document.createElement('tr');
        
        const pointsColor = item.points < 0 ? '#d90429' : '#2d6a4f';
        const pointsSign = item.points > 0 ? '+' : '';
        let pillClass = item.status === "Used" ? "used" : "completed";

        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.activity}</td>
            <td style="color: ${pointsColor}; font-weight: bold;">${pointsSign}${item.points}</td>
            <td><span class="status-pill ${pillClass}">${item.status}</span></td>
        `;
        historyTableBody.prepend(row);
    });
}