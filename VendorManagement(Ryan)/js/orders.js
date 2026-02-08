const orders = [
  { id: "044", item: "1× Golden Crispy chicken rice", time: "1:16 PM", status: "Waiting for Acceptance" },
  { id: "043", item: "2× Steamed chicken rice", time: "1:09 PM", status: "Waiting for Acceptance" },
  { id: "042", item: "1× Chicken Drumstick rice", time: "12:55 PM", status: "In Progress" },
  { id: "041", item: "1× Roasted chicken rice", time: "12:48 PM", status: "Refund Requested" },
  { id: "040", item: "1× Chicken Drumstick rice", time: "12:30 PM", status: "Refunded" },
  { id: "039", item: "1× Roasted chicken rice", time: "12:25 PM", status: "Refunded" },
];
orders.sort((a, b) => Number(b.id) - Number(a.id));

const page_size = 6;
let page = 1;
let filter = "all";

function statusClass(status) {
  if (status === "Waiting for Acceptance") return "wait";
  if (status === "In Progress") return "prog";
  if (status === "Refund Requested") return "refundreq";
  if (status === "Refunded") return "ref";
  return "refundreq";
}

// status function
function actionFor(status) {
  if (status === "Waiting for Acceptance") {
    return { text: "Accept", cls: "action-accept", disabled: false };
  }
  if (status === "In Progress" || status === "Refund Requested") {
    return { text: "Refund", cls: "action-refund", disabled: false };
  }
  return { text: "Refunded", cls: "action-disabled", disabled: true };
}

function matchesFilter(o) {
  if (filter === "all") return true;
  if (filter === "waiting") return o.status === "Waiting for Acceptance";
  if (filter === "ongoing") return o.status === "In Progress" || o.status === "Refund requested";
  return true;
}

function updateCounts() {
  const waiting = orders.filter(o => o.status === "Waiting for Acceptance").length;
  const ongoing = orders.filter(o => o.status === "In Progress" || o.status === "Refund requested").length;

  const w = document.getElementById("countWaiting");
  const og = document.getElementById("countOngoing");
  if (w) w.textContent = waiting;
  if (og) og.textContent = ongoing;
}

function render() {
  const body = document.getElementById("ordersBody");
  if (!body) return;

  const list = orders.filter(matchesFilter);

  const maxPage = Math.max(1, Math.ceil(list.length / page_size));
  if (page > maxPage) page = maxPage;

  const start = (page - 1) * page_size;
  const slice = list.slice(start, start + page_size);

  body.innerHTML = slice.map(o => {
    const sCls = statusClass(o.status);
    const act = actionFor(o.status);
    return `
      <tr>
        <td><span class="order-id">#${o.id}</span></td>
        <td>${o.item}</td>
        <td>${o.time}</td>
        <td><span class="status ${sCls}">${o.status}</span></td>
        <td>
          <button
            class="action-btn ${act.cls}"
            data-id="${o.id}"
            ${act.disabled ? "disabled" : ""}
          >
            ${act.text}
          </button>
        </td>
      </tr>
    `;
  }).join("");

  const pageBtn = document.getElementById("pageBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (pageBtn) pageBtn.textContent = String(page);
  if (prevBtn) prevBtn.disabled = page === 1;
  if (nextBtn) nextBtn.disabled = page === maxPage;

  updateCounts();
}
const filtersEl = document.getElementById("filters");
if (filtersEl) {
  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    page = 1;
    render();
  });
}
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    page = Math.max(1, page - 1);
    render();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    page += 1;
    render();
  });
}
const ordersBody = document.getElementById("ordersBody");
if (ordersBody) {
  ordersBody.addEventListener("click", (e) => {
    const btn = e.target.closest(".action-btn");
    if (!btn || btn.disabled) return;

    const id = btn.dataset.id;
    const order = orders.find(o => o.id === id);
    if (!order) return;
    if (order.status === "Waiting for Acceptance") {
      order.status = "In Progress";
    }
    else if (order.status === "In Progress" || order.status === "Refund Requested") {
      order.status = "Refunded";
    }
    render();
  });
}
render();
