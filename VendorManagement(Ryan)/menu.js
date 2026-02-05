// Placeholder for future interactivity
// Example: toggle active/inactive, pagination, store switching, etc.

console.log("Menu page loaded");
const addMenuBtn = document.getElementById("addMenu");
const modal = document.getElementById("menuModal");
const cancelBtn = document.querySelector(".cancel-btn");

addMenuBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close when clicking outside modal
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
