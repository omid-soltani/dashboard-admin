// ===== Sidebar drawer =====
(function () {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebar-toggle");
  const chevron = document.getElementById("sidebar-chevron");
  const backdrop = document.getElementById("sidebar-backdrop");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  if (!sidebar || !toggle) return;

  const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
  let isOpen = false;

  function render() {
    sidebar.classList.toggle("-translate-x-full", !isOpen);
    sidebar.classList.toggle("translate-x-0", isOpen);
    chevron.classList.toggle("rotate-180", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    backdrop.classList.toggle("hidden", !(isOpen && !isDesktop()));
  }

  function setOpen(value) {
    isOpen = value;
    render();
  }

  toggle.addEventListener("click", () => setOpen(!isOpen));
  if (mobileBtn) mobileBtn.addEventListener("click", () => setOpen(!isOpen));
  backdrop.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setOpen(false);
  });

  // open by default on desktop, closed on mobile
  setOpen(isDesktop());

  window.addEventListener("resize", () => {
    backdrop.classList.toggle("hidden", !(isOpen && !isDesktop()));
  });
})();

// ===== Sidebar active link =====
(function () {
  const links = document.querySelectorAll("[data-nav-link]");
  if (!links.length) return;

  const activeClasses = [
    "text-neon-600",
    "dark:text-neon-400",
    "bg-neon-500/10",
    "shadow-neon-ring",
  ];

  const inactiveClasses = [
    "text-ink-light/70",
    "dark:text-ink-dark/70",
    "hover:bg-neon-500/5",
    "hover:text-neon-600",
    "dark:hover:text-neon-400",
    "hover:translate-x-1",
  ];

  const getFileName = (path) =>
    path.split("#")[0].split("?")[0].split("/").pop();

  const current = getFileName(location.pathname) || "index.html";

  links.forEach((link) => {
    const target = getFileName(link.getAttribute("href") || "");
    const isActive = target !== "" && target === current;

    activeClasses.forEach((c) => link.classList.toggle(c, isActive));
    inactiveClasses.forEach((c) => link.classList.toggle(c, !isActive));

    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
})();
