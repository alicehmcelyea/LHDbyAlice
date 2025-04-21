document.addEventListener("DOMContentLoaded", function () {
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
