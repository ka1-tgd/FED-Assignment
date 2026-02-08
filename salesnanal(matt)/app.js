// Highlights the active nav link automatically based on file name.
(function () {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav a");

  links.forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  
  const logout = document.querySelector('[data-logout="true"]');
  if (logout) {
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }
  const manageBtn = document.getElementById("manageBtn");
  if (manageBtn) {
    manageBtn.addEventListener("click", () => {
      window.location.href = "../VendorManagement(Ryan)/html/dashboard.html";
    });
  }
})();
