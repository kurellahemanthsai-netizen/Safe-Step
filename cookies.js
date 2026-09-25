/* =========================================================
   SAFE STEP — PRIVACY POLICY JS
========================================================= */

"use strict";


/* =========================================================
   REFRESH LUCIDE ICONS
========================================================= */

function refreshPrivacyIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}


/* =========================================================
   TABLE OF CONTENTS
========================================================= */

function initializePrivacyNavigation() {

  const links = document.querySelectorAll(
    ".toc-nav a"
  );

  links.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const offset = 25;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  refreshPrivacyIcons();

  initializePrivacyNavigation();

});