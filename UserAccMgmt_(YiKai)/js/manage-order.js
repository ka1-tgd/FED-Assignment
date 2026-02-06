document.addEventListener("DOMContentLoaded", () => {
    const orders = document.querySelectorAll(".order-card");

    orders.forEach(order => {
        const preparingBtn = order.querySelector(".btn-preparing");
        const completeBtn = order.querySelector(".btn-complete");
        const statusText = order.querySelector(".order-status");

        preparingBtn.addEventListener("click", () => {
            updateStatus(order, statusText, "Preparing");
        });

        completeBtn.addEventListener("click", () => {
            updateStatus(order, statusText, "Complete");
        });
    });
});

function updateStatus(orderCard, statusText, newStatus) {
    orderCard.dataset.status = newStatus.toLowerCase();
    statusText.textContent = `Status: ${newStatus}`;

    // Optional visual feedback
    orderCard.classList.remove("received", "preparing", "complete");
    orderCard.classList.add(newStatus.toLowerCase());
}