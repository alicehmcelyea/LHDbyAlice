document.addEventListener("DOMContentLoaded", function () {
  // STEP 1: Get title from URL
  const params = new URLSearchParams(window.location.search);
  const pageTitle = params.get("title");

  // STEP 2: Inject title before includes load (sidebar, heroData object)
  if (pageTitle) {
    const contentHeader = document.querySelector(".sidebar-richtext h2");
    if (contentHeader) {
      contentHeader.innerText = pageTitle;
    }

    // Set heroData.title before hero gets loaded
    if (typeof heroData !== "undefined") {
      heroData.title = pageTitle;
    }
  }

  // STEP 3: Load includes
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach((el) => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then((data) => {
        el.innerHTML = data;

        // Inject dynamic content into hero-text-nav
        if (file.includes("hero-text-nav") && typeof heroData !== "undefined") {
          const titleEl = el.querySelector(".hero-title");
          const navEl = el.querySelector(".hero-nav");

          if (titleEl) {
            titleEl.textContent = heroData.title;
          }

          if (navEl && heroData.navItems) {
            navEl.innerHTML = "";
            heroData.navItems.forEach((item) => {
              const link = document.createElement("a");
              link.href = "#"; // You can update this to real anchors
              link.className = "hero-nav-items";
              link.textContent = item;
              navEl.appendChild(link);
            });
          }
        }

        // Inject dynamic content into hero-breadcrumb-nav
        if (file.includes("hero-breadcrumb-nav") && pageTitle) {
          const titleEl = el.querySelector(".hero-title");
          const breadcrumbEl = el.querySelector(".breadcrumb-current");

          if (titleEl) {
            titleEl.textContent = pageTitle;
          }

          if (breadcrumbEl) {
            breadcrumbEl.textContent = pageTitle;
          }
        }
      })
      .catch((err) => {
        console.error(err);
        el.innerHTML = `<p>Could not load ${file}</p>`;
      });
  });
});
