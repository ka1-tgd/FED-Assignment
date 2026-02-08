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

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
(function setupStoreSwitching() {
  const notice = document.getElementById("storeNotice");

  function showNotice(msg) {
    if (!notice) return;
    notice.textContent = msg;
    notice.classList.add("show");

    clearTimeout(showNotice._t);
    showNotice._t = setTimeout(() => notice.classList.remove("show"), 2500);
  }

  document.querySelectorAll(".store-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const storeName = item.dataset.store || item.textContent.trim();
      if (item.classList.contains("unavailable")) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
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
