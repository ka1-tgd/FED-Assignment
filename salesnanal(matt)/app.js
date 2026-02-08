// Highlights the active nav link automatically based on file name.
(function () {
  const path = window.location.pathname.split("/").pop() || "index.html"; //extracts name of current page url
  const links = document.querySelectorAll(".nav a"); //grabs all <a> tags with class .nav and returns a NodeList  

  links.forEach(a => { //loops through each nav link
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active"); //if href is the filename, add class active. then draws underline
  });

  
  const logout = document.querySelector('[data-logout="true"]'); //finds log out link
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
