document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      if (page) Router.navigate(page);
    });
  });
  const hash = window.location.hash.slice(1) || "home";
  Router.loadPage(hash);
  Router.updateNavigation();

  window.addEventListener("popstate", () => {
    const hash = window.location.hash.slice(1) || "home";
    Router.loadPage(hash);
  });
});
