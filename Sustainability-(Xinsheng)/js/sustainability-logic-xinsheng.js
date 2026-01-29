// Scope everything to avoid global variable conflicts with groupmates
(function() {
    const byoBtn = document.getElementById('byo-claim-btn');
    const plasticDisplay = document.getElementById('plastic-saved');
    const pointsDisplay = document.getElementById('green-points');
    const ecoToggle = document.getElementById('eco-toggle');

    let currentPoints = 340;
    let currentPlastic = 12;

    // Handle BYO Points logic
    byoBtn.addEventListener('click', function() {
        currentPoints += 15;
        currentPlastic += 1;

        // Update UI
        pointsDisplay.textContent = currentPoints;
        plasticDisplay.textContent = currentPlastic;

        // Visual feedback
        this.textContent = "Points Claimed!";
        this.style.backgroundColor = "#81c784";
        this.disabled = true;

        console.log("Sustainability Update: User indicated BYO container usage.");
    });

    // Handle Packaging Toggle
    ecoToggle.addEventListener('change', function() {
        if (this.checked) {
            alert("Eco-friendly packaging selected. A $0.20 fee will be added to your total.");
        }
    });

    // Simulate a "Social Nudge" notification after 3 seconds
    setTimeout(() => {
        console.log("Flash sale notification pushed to user.");
    }, 3000);
})();