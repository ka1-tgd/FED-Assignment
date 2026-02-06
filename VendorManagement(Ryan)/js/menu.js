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

// close when clicking outside 
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
