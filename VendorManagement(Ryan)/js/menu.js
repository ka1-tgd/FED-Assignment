import { fetchMenu, uploadImg, saveItem, deleteItem } from "./menuDOM.js";
const addMenuBtn = document.getElementById("addMenu");
const modal = document.getElementById("menuModal");
const cancelBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".save-btn");
 
const grid = document.querySelector(".menu-grid");
const notice = document.getElementById("storeNotice");
 
const nameInput = modal.querySelector('.form-group input[type="text"]');
const priceInput = modal.querySelector('.price-input input[type="number"]');
const imgInput = document.getElementById("menuImage");
let editingId = null;   // this is for editing mode
let Img = "";
 
let deleteBtn = document.getElementById("deleteMenuBtn");
if (!deleteBtn) {
  deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteMenuBtn";
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.style.background = "#dfdbdb";         // popup for delete button
  const actions = modal.querySelector(".modal-actions");
  actions.insertBefore(deleteBtn, actions.firstChild);
}
deleteBtn.disabled = true;
function openModal() {
  modal.style.display = "flex";
}
 
function closeModal() {
  modal.style.display = "none";
}
 
function showNotice(msg) {
  if (!notice) return;
  notice.textContent = msg;
  notice.classList.add("show");
  clearTimeout(showNotice._t);
  showNotice._t = setTimeout(() => notice.classList.remove("show"), 2500);
}
 
addMenuBtn.addEventListener("click", () => {
  openModal();
});
 
cancelBtn.addEventListener("click", closeModal);
 
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
(function setupStoreSwitching() {
  document.querySelectorAll(".store-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const storeName = item.dataset.store || item.textContent.trim();
 
      if (item.classList.contains("unavailable")) {
        e.preventDefault();
        e.stopPropagation();
        showNotice(`${storeName} is unavailable`);
        return;
      }
      document.querySelectorAll(".store-item").forEach((s) => {
        s.classList.remove("selected");
        const arrow = s.querySelector(".arrow");
        if (arrow) arrow.textContent = "▼";
      });
      item.classList.add("selected");
      const arrow = item.querySelector(".arrow");
      if (arrow) arrow.textContent = "▶";
 
      if (notice) notice.classList.remove("show");
    }, true);
  });
})();
function renderMenu(items) {
  items.sort((a, b) => (a.FoodItemName || a.id).localeCompare(b.FoodItemName || b.id));
 
  grid.innerHTML = items.map(it => {
    const name = it.FoodItemName || it.id;
    const price = Number(it.Price ?? 0).toFixed(2);
    const img = it.FoodImg || "../img/steamChicken.jpg";
    const active = it.Active !== false;
 
    return `
      <div class="menu-card" data-id="${it.id}" data-img="${img}">
        <img class="menu-img" src="${img}" alt="${name}">
        <h3>${name}</h3>
        <div class="footer">
          <span class="price">$${price}</span>
          <button class="edit-btn" type="button">Edit</button>
          <span class="status ${active ? "active" : "inactive"}">● ${active ? "Active" : "Inactive"}</span>
        </div>
      </div>
    `;
  }).join("");
}
async function loadMenu() {
 
const items = await fetchMenu();
renderMenu(items);}
 
grid.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  if (!editBtn) return;
 
  const card = e.target.closest(".menu-card");
  if (!card) return;
 
  editingId = card.dataset.id;
  Img = card.dataset.img || "";
 
  nameInput.value = card.querySelector("h3").textContent.trim();
  priceInput.value = card.querySelector(".price").textContent.replace("$", "").trim();
  imgInput.value = "";
 
  deleteBtn.disabled = false;
  openModal();
});
saveBtn.addEventListener("click", async () => {
const name = nameInput.value.trim();
const price = Number(priceInput.value);
saveBtn.disabled = true;
const file = imgInput.files?.[0];
const newUrl = file ? await uploadImg(file) : "";
const finalUrl = newUrl || Img || "";
const newDocId = name;
await saveItem(newDocId, {
      FoodItemName: name,
      Price: price,
      FoodImg: finalUrl,
      Active: true
    });
    if (editingId && editingId !== newDocId) {
      await deleteItem(editingId);
    }
    closeModal();
    await loadMenu();
 
});
deleteBtn.addEventListener("click", async () => {
  if (!editingId) return;
 
  const deleteID = confirm(`Delete "${editingId}"?`);
  if (!deleteID) return;
    await deleteItem(editingId);
    closeModal();
    await loadMenu();
 
});
document.addEventListener("DOMContentLoaded", () => {
  closeModal();
  loadMenu();
});
