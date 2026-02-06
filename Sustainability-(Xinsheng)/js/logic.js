// 1. INITIALIZATION
// Check if points exist; if not, start with 300
let userPoints = localStorage.getItem('ecoPoints');
if (userPoints === null) {
    userPoints = 300;
    localStorage.setItem('ecoPoints', userPoints);
} else {
    userPoints = parseInt(userPoints);
}

// Load dynamic history (new real actions)
let userHistory = JSON.parse(localStorage.getItem('ecoHistory')) || [];

// Update the "Points: ..." badge on page load
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
        if (pointsDisplay) pointsDisplay.innerText = userPoints;
        
        // Reload page to show change if on history page
        if(window.location.href.includes("history.html")) location.reload();
        
    } else {
        alert(`Insufficient Points! You need ${cost} points.`);
    }
}

// 3. PACKAGING PAGE LOGIC
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

// 4. SAVE HELPER
function saveAllData() {
    localStorage.setItem('ecoPoints', userPoints);
    localStorage.setItem('ecoHistory', JSON.stringify(userHistory));
}

// 5. HISTORY RENDERER (Merges Real + Fake Data)
const historyTableBody = document.getElementById('history-table-body');
if (historyTableBody) {
    
    // Reverse loop to keep order correct when prepending
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
        
        // Insert at the very top of the table body
        historyTableBody.prepend(row);
    });
}