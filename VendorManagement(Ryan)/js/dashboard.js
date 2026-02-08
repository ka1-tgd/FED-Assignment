
const orderStats = [
  { num: 2, label: "Waiting for Acceptance" },
  { num: 1, label: "Onging" },
  { num: 1, label: "Onging" },
  { num: 2, label: "Refunds", red: true },
];

const IMG_BASE = "../img/";

const bestsellerMenu = [
  { name: "Steamed chicken rice", price: "$3.50", reviews: "(120 reviews)", img: IMG_BASE + "steamChicken.jpg" },
  { name: "Roasted chicken rice", price: "$3.50", reviews: "", img: IMG_BASE + "roastedChicken.jpg" },
  { name: "Golden Crispy chicken rice", price: "$4.50", reviews: "", img: IMG_BASE + "CrispyChicken.jpg" },
];


const inventoryRows = [
  { name: "Chicken", category: "Meats", qty: 10, unit: "KG", status: "In stock", type: "instock" },
  { name: "Rice", category: "Grains", qty: 20, unit: "KG", status: "In stock", type: "instock" },
  { name: "Soy Sauce", category: "Seasonings", qty: 1, unit: "Litres", status: "Low Stock", type: "lowstock" },
  { name: "Eggs", category: "Produce", qty: 150, unit: "Count", status: "In stock", type: "instock" },
  { name: "Ginger Paste", category: "Seasonings", qty: 0, unit: "G", status: "No stock", type: "nostock" },
  { name: "Cucumber", category: "Vegetables", qty: 30, unit: "KG", status: "In stock", type: "instock" },
];

const recentOrders = [
  { id: "#044", item: "1× Golden Crispy chicken rice", time: "1:16 PM", status: "Waiting for Acceptance", type: "wait" },
  { id: "#043", item: "2× Steamed chicken rice", time: "1:09 PM", status: "In Progress", type: "inprog" },
  { id: "#042", item: "1× Chicken Drumstick rice", time: "12:55 PM", status: "Refund Requested", type: "refreq" },
  { id: "#041", item: "1× Roasted chicken rice", time: "12:48 PM", status: "Refunded", type: "refunded" },
  { id: "#039", item: "1× Roasted chicken rice", time: "12:25 PM", status: "Refunded", type: "refunded" },
];
function el(id) {
  return document.getElementById(id);
}

function chip(type, label) {
  return `<span class="chip ${type}">${label}</span>`;
}

function renderStats() {
  const wrap = el("orderStats");
  if (!wrap) return;
  wrap.innerHTML = orderStats.map(s => `
    <div class="stat-line">
      <div class="stat-num ${s.red ? "red" : ""}">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join("");
}

function renderMenu() {
  const list = el("menuList");
  if (!list) return;

  list.innerHTML = bestsellerMenu.map(m => `
    <div class="menu-item">
      <div class="thumb">
        ${m.img ? `<img src="${m.img}" alt="${m.name}">` : ""}
      </div>

      <div class="menu-mid">
        <div class="name">${m.name}</div>
        ${m.reviews ? `<div class="reviews">${m.reviews}</div>` : ""}
      </div>

      <div class="menu-right">
        <div class="price-pill">${m.price}</div>
        <button class="edit-btn" type="button">Edit</button>
      </div>
    </div>
  `).join("");
}


function renderInventory() {
  const tb = document.getElementById("inventoryTableBody");
  if (!tb) return;
  const filtered = inventoryRows.filter(r => r.type === "lowstock" || r.type === "nostock");
  tb.innerHTML = filtered.map(r => `
    <tr>
      <td><span class="id-hash">${r.name}</span></td>
      <td>${r.category}</td>
      <td>${chip(r.type, r.status)}</td>
    </tr>
  `).join("");
}

function renderOrders() {
  const tb = el("ordersTableBody");
  if (!tb) return;

  tb.innerHTML = recentOrders.map(r => `
    <tr>
      <td><span class="id-hash">${r.id}</span></td>
      <td>${r.item}</td>
      <td>${r.time}</td>
      <td>${chip(r.type, r.status)}</td>
    </tr>
  `).join("");
}

function bindButtons() {
  const go = (id, relPath) => {
    const node = document.getElementById(id);
    if (!node) return;

    node.addEventListener("click", (e) => {e.preventDefault();
      window.location.assign(new URL(relPath, window.location.href).href);
    });
  };
  go("viewFullMenuBtn", "menu.html");
  go("viewRenewalBtn", "renewal.html");
  go("requestRenewalBtn", "renewal.html");
  go("viewFullInventoryBtn", "inventory.html");
  go("viewAllOrdersBtn", "orders.html");
}


function init() {
  renderStats();
  renderMenu();
  renderInventory();
  renderOrders();
  bindButtons();
}

document.addEventListener("DOMContentLoaded", init);
