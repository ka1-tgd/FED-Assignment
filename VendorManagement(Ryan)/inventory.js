function filterItems(type) {
    const rows = document.querySelectorAll("#inventoryTable tr");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    rows.forEach(row => {
        const status = row.getAttribute("data-status");

        if (type === "all") {
            row.style.display = "";
        } else if (type === "low" && status === "low") {
            row.style.display = "";
        } else if (type === "none" && status === "none") {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
