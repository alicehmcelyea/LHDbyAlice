document.addEventListener("DOMContentLoaded", function () {
    const includes = document.querySelectorAll('[data-include]');
    includes.forEach(el => {
      const file = el.getAttribute('data-include');
      fetch(file)
        .then(res => res.text())
        .then(data => {
          el.innerHTML = data;
        });
    });
  });
  