function filterItems(type, e) {
  const rows = document.querySelectorAll("#inventoryTable tr");
  const buttons = document.querySelectorAll(".filter-btn");

  // active button
  buttons.forEach(btn => btn.classList.remove("active"));
  if (e && e.target) e.target.classList.add("active");

  rows.forEach(row => {
    const status = row.getAttribute("data-status");

    if (type === "all") row.style.display = "";
    else if (type === "low" && status === "low") row.style.display = "";
    else if (type === "none" && status === "none") row.style.display = "";
    else row.style.display = "none";
  });
}

// wiring
const modal = document.getElementById("ingredientModal");
const addBtn = document.getElementById("addIngredientBtn");
const cancelBtn = document.getElementById("cancelModalBtn");
const saveBtn = document.getElementById("saveModalBtn");

const ingName = document.getElementById("ingName");
const ingCategory = document.getElementById("ingCategory");
const ingQty = document.getElementById("ingQty");
const ingUnit = document.getElementById("ingUnit");

const inventoryTable = document.getElementById("inventoryTable");

function openModal() {
  modal.classList.remove("hidden");
  ingName.value = "";
  ingCategory.value = "";
  ingQty.value = 0;
  ingUnit.value = "";
  ingName.focus();
}

function closeModal() {
  modal.classList.add("hidden");
}

addBtn?.addEventListener("click", openModal);
cancelBtn?.addEventListener("click", closeModal);

// close when clicking outside
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal(); });
function statusFromQty(qty) {
  if (qty <= 0) return { key: "none", label: "No stock", cls: "none" };
  if (qty <= 2) return { key: "low", label: "Low Stock", cls: "low" };
  return { key: "in", label: "In stock", cls: "in" };
}

saveBtn?.addEventListener("click", () => {
  const name = ingName.value.trim();
  const category = ingCategory.value.trim();
  const qty = Number(ingQty.value);
  const unit = ingUnit.value.trim();

  if (!name || !category || !unit || Number.isNaN(qty) || qty < 0) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const s = statusFromQty(qty);
  const tr = document.createElement("tr");
  tr.setAttribute("data-status", s.key);
  tr.innerHTML = `
    <td>${name}</td>
    <td>${category}</td>
    <td>
      <select><option>${qty}</option></select>
    </td>
    <td>${unit}</td>
    <td><span class="status ${s.cls}">${s.label}</span></td>
    <td><button class="edit-btn">Edit</button></td>`;
  inventoryTable.appendChild(tr);
  closeModal();
});
