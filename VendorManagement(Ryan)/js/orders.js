const orders = [
  { id: "044", item: "1× Golden Crispy chicken rice", time: "1:16 PM", status: "Waiting for Acceptance" },
  { id: "043", item: "2× Steamed chicken rice", time: "1:09 PM", status: "Waiting for Acceptance" },
  { id: "042", item: "1× Chicken Drumstick rice", time: "12:55 PM", status: "In Progress" },
  { id: "041", item: "1× Roasted chicken rice", time: "12:48 PM", status: "Refund Requested" },
  { id: "040", item: "1× Chicken Drumstick rice", time: "12:30 PM", status: "Refunded" },
  { id: "039", item: "1× Roasted chicken rice", time: "12:25 PM", status: "Refunded" },
];

//  sort descending 
orders.sort((a, b) => Number(b.id) - Number(a.id));

const PAGE_SIZE = 6;
let page = 1;
let filter = "all";

function statusClass(status) {
  if (status === "Waiting for Acceptance") return "wait";
  if (status === "In Progress") return "prog";
  if (status === "Refund Requested") return "refreq";
  if (status === "Refunded") return "ref";
  return "refreq";
}

function actionFor(status) {
  if (status === "Waiting for Acceptance") return { text: "Accept", cls: "action-accept", disabled: false };
  if (status === "In Progress" || status === "Refund Requested") return { text: "Refund", cls: "action-refund", disabled: false };
  return { text: "Refunded", cls: "action-disabled", disabled: true };
}

function matchesFilter(o) {
  if (filter === "all") return true;
  if (filter === "waiting") return o.status === "Waiting for Acceptance";
  if (filter === "ongoing") return o.status === "In Progress" || o.status === "Refund Requested";
  return true;
}

function updateCounts() {
  const waiting = orders.filter(o => o.status === "Waiting for Acceptance").length;
  const ongoing = orders.filter(o => o.status === "In Progress" || o.status === "Refund Requested").length;
  document.getElementById("countWaiting").textContent = waiting;
  document.getElementById("countOngoing").textContent = ongoing;
}

function render() {
  const body = document.getElementById("ordersBody");
  const list = orders.filter(matchesFilter);

  const maxPage = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  if (page > maxPage) page = maxPage;

  const start = (page - 1) * PAGE_SIZE;
  const slice = list.slice(start, start + PAGE_SIZE);

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
          <button class="action-btn ${act.cls}" ${act.disabled ? "disabled" : ""}>
            ${act.text}
          </button>
        </td>
      </tr>
    `;
  }).join("");

  document.getElementById("pageBtn").textContent = String(page);
  document.getElementById("prevBtn").disabled = page === 1;
  document.getElementById("nextBtn").disabled = page === maxPage;
}

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  filter = btn.dataset.filter;
  page = 1;
  render();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  page = Math.max(1, page - 1);
  render();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  page += 1;
  render();
});

document.getElementById("addIngredientBtn").addEventListener("click", () => {
  alert("Add Ingredient flow here");
});

updateCounts();
render();
