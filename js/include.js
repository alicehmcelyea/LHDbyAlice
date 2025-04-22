document.addEventListener("DOMContentLoaded", function () {
  // STEP 1: Get title from URL (before includes load)
  const params = new URLSearchParams(window.location.search);
  const pageTitle = params.get("title");

  if (pageTitle) {
    // Update content header title
    const contentHeader = document.querySelector(".sidebar-richtext h2");
    if (contentHeader) {
      contentHeader.innerText = pageTitle;
    }

    // Also update hero title if heroData is defined
    if (typeof heroData !== "undefined") {
      heroData.title = pageTitle;
    }
  }

  // STEP 2: Load includes
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;

        // Inject hero content if present
        if (file.includes('hero-text-nav') && typeof heroData !== "undefined") {
          const titleEl = el.querySelector(".hero-title");
          const navEl = el.querySelector(".hero-nav");

          if (titleEl) {
            titleEl.textContent = heroData.title;
          }

          if (navEl && heroData.navItems) {
            navEl.innerHTML = "";
            heroData.navItems.forEach(item => {
              const link = document.createElement("a");
              link.href = "#"; // Update this as needed
              link.className = "hero-nav-items";
              link.textContent = item;
              navEl.appendChild(link);
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `<p>Could not load ${file}</p>`;
      });
  });
});

if (pageTitle) {
  const contentHeader = document.querySelector(".sidebar-richtext h2");
  if (contentHeader) {
    contentHeader.innerText = pageTitle;
  }

  if (typeof heroData !== "undefined") {
    heroData.title = pageTitle;
  }

  // Inject into breadcrumb if present
  const breadcrumbCurrent = document.querySelector(".breadcrumb-current");
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = pageTitle;
  }

  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.textContent = pageTitle;
  }
}
