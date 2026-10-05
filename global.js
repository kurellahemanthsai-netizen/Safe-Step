/* =========================================================
   SAFE STEP
   HEADER + FOOTER JAVASCRIPT
   ========================================================= */

/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

/* =========================================================
   DARK MODE
   ========================================================= */

const darkToggle = document.getElementById("darkToggle");

function updateDarkIcon() {
  if (!darkToggle) {
    return;
  }

  const isDark = document.body.classList.contains("dark-mode");

  darkToggle.innerHTML = isDark
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  darkToggle.setAttribute("title", isDark ? "Light Mode" : "Dark Mode");

  darkToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  refreshIcons();
}

/* APPLY DARK MODE */

function applyDarkMode(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  localStorage.setItem("safe-step-dark-mode", isDark ? "true" : "false");

  updateDarkIcon();
}

/* TOGGLE */

darkToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");

  applyDarkMode(!isDark);
});

/* =========================================================
   RTL MODE
   ========================================================= */

const rtlToggle = document.getElementById("rtlToggle");

function updateRTLState() {
  if (!rtlToggle) {
    return;
  }

  const isRTL = document.body.classList.contains("rtl");

  rtlToggle.setAttribute("title", isRTL ? "LTR Mode" : "RTL Mode");

  rtlToggle.setAttribute(
    "aria-label",
    isRTL ? "Switch to left-to-right mode" : "Switch to right-to-left mode",
  );

  rtlToggle.setAttribute("aria-pressed", isRTL ? "true" : "false");
}

/* APPLY RTL */

function applyRTL(isRTL) {
  document.body.classList.toggle("rtl", isRTL);

  document.body.setAttribute("dir", isRTL ? "rtl" : "ltr");

  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");

  document.documentElement.setAttribute("lang", isRTL ? "ar" : "en");

  localStorage.setItem("safe-step-rtl-mode", isRTL ? "true" : "false");

  updateRTLState();
}

/* TOGGLE */

rtlToggle?.addEventListener("click", () => {
  const isRTL = document.body.classList.contains("rtl");

  applyRTL(!isRTL);
});

/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");

const navbar = document.querySelector(".navbar");

/* CLOSE MENU */

function closeMobileMenu() {
  if (!navbar || !menuToggle) {
    return;
  }

  navbar.classList.remove("active");

  menuToggle.innerHTML = '<i data-lucide="menu"></i>';

  menuToggle.setAttribute("aria-label", "Open menu");

  menuToggle.setAttribute("aria-expanded", "false");

  refreshIcons();
}

/* TOGGLE MENU */

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", function (event) {
    event.preventDefault();

    event.stopPropagation();

    const isOpen = navbar.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    menuToggle.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    refreshIcons();
  });
}

/* =========================================================
   HOME DROPDOWN
   ========================================================= */

const homeDropdown = document.querySelector(".dropdown");

if (homeDropdown) {
  const homeLink = homeDropdown.querySelector(":scope > a");

  homeLink?.addEventListener("click", (event) => {
    if (window.innerWidth <= 1100) {
      event.preventDefault();

      homeDropdown.classList.toggle("active");
    }
  });
}

/* =========================================================
   CLOSE MENU AFTER LINK CLICK
   ========================================================= */

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 1100) {
      const isHomeLink =
        link.closest(".dropdown") &&
        link.parentElement.classList.contains("dropdown");

      if (!isHomeLink) {
        closeMobileMenu();
      }
    }
  });
});

/* =========================================================
   CLOSE MENU ON RESIZE
   ========================================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 1100) {
    closeMobileMenu();
  }
});

/* =========================================================
   BACK TO TOP
   ========================================================= */

const topButton = document.querySelector(".top-btn");

topButton?.addEventListener("click", (event) => {
  event.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================================================
   CLOSE MENU OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {
  if (window.innerWidth > 1100) {
    return;
  }

  if (!navbar || !menuToggle) {
    return;
  }

  const clickedInsideNavbar = navbar.contains(event.target);

  const clickedMenuButton = menuToggle.contains(event.target);

  if (!clickedInsideNavbar && !clickedMenuButton) {
    closeMobileMenu();
  }
});

/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* LUCIDE */

  refreshIcons();

  /* RESTORE DARK MODE */

  const savedDarkMode = localStorage.getItem("safe-step-dark-mode") === "true";

  document.body.classList.toggle("dark-mode", savedDarkMode);

  /* RESTORE RTL */

  const savedRTL = localStorage.getItem("safe-step-rtl-mode") === "true";

  document.body.classList.toggle("rtl", savedRTL);

  /* BODY DIRECTION */

  document.body.setAttribute("dir", savedRTL ? "rtl" : "ltr");

  /* HTML DIRECTION */

  document.documentElement.setAttribute("dir", savedRTL ? "rtl" : "ltr");

  /* LANGUAGE */

  document.documentElement.setAttribute("lang", savedRTL ? "ar" : "en");

  /* UPDATE CONTROLS */

  updateDarkIcon();

  updateRTLState();

  /* =====================================================
       ACTIVE PAGE
    ===================================================== */

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  document.querySelectorAll(".nav-links > li > a").forEach((link) => {
    const linkPage = link
      .getAttribute("href")
      ?.split("/")
      .pop()
      .split("#")[0]
      .toLowerCase();

    if (linkPage && linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
