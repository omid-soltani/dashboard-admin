const initHeader = function () {
  /* =====================================================
               1) THEME TOGGLE — dark/light with persisted preference
            ===================================================== */
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");

  function applyTheme(mode) {
    if (mode === "dark") {
      root.classList.add("dark");
      iconSun.classList.add("hidden");
      iconMoon.classList.remove("hidden");
    } else {
      root.classList.remove("dark");
      iconMoon.classList.add("hidden");
      iconSun.classList.remove("hidden");
    }
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme =
    typeof Storage !== "undefined"
      ? localStorage.getItem("dashboard-theme")
      : null;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  themeBtn.addEventListener("click", function () {
    const isDark = root.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    if (typeof Storage !== "undefined")
      localStorage.setItem("dashboard-theme", next);
  });

  /* =====================================================
               2) LIVE CLOCK — current time & date
            ===================================================== */
  const clockTimeEl = document.getElementById("clock-time");
  const clockDateEl = document.getElementById("clock-date");

  function updateClock() {
    const now = new Date();
    clockTimeEl.textContent = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    clockDateEl.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }
  updateClock();
  setInterval(updateClock, 1000 * 30);

  /* =====================================================
               3) DROPDOWN HELPERS — notifications & profile menus
            ===================================================== */
  function setupDropdown(btn, menu, onOpen) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isHidden = menu.classList.contains("hidden");
      document.querySelectorAll(".js-dropdown-menu").forEach(function (m) {
        if (m !== menu) m.classList.add("hidden");
      });
      menu.classList.toggle("hidden");
      if (isHidden && onOpen) onOpen();
    });
  }

  const notifMenu = document.getElementById("notif-menu");
  const profileMenu = document.getElementById("profile-menu");
  notifMenu.classList.add("js-dropdown-menu");
  profileMenu.classList.add("js-dropdown-menu");

  setupDropdown(document.getElementById("notif-btn"), notifMenu);
  setupDropdown(
    document.getElementById("profile-btn"),
    profileMenu,
    function () {
      document.getElementById("profile-chevron").classList.add("rotate-180");
    },
  );

  document.addEventListener("click", function () {
    document.querySelectorAll(".js-dropdown-menu").forEach(function (m) {
      m.classList.add("hidden");
    });
    document.getElementById("profile-chevron").classList.remove("rotate-180");
  });
};

window.addEventListener("DOMContentLoaded", function () {
  initHeader();
});
