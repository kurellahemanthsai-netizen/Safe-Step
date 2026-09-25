/* =========================================================
   SAFE STEP — COMING SOON PAGE JS
========================================================= */

"use strict";


/* =========================================================
   COUNTDOWN SETTINGS
========================================================= */

/*
   Change this date/time when you know the actual launch date.

   Format:
   YYYY-MM-DDTHH:MM:SS

   Example:
   2026-12-31T23:59:59
*/

const launchDate = new Date("2026-12-31T23:59:59");


/* =========================================================
   REFRESH LUCIDE ICONS
========================================================= */

function refreshComingSoonIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}


/* =========================================================
   COUNTDOWN ELEMENTS
========================================================= */

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(number) {
  return String(number).padStart(2, "0");
}


/* =========================================================
   UPDATE COUNTDOWN
========================================================= */

function updateCountdown() {

  const now = new Date();

  const difference = launchDate.getTime() - now.getTime();


  /* -------------------------
     COUNTDOWN FINISHED
  -------------------------- */

  if (difference <= 0) {

    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    clearInterval(countdownInterval);

    return;
  }


  /* -------------------------
     CALCULATE TIME
  -------------------------- */

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;


  /* -------------------------
     UPDATE UI
  -------------------------- */

  daysElement.textContent = formatNumber(days);
  hoursElement.textContent = formatNumber(hours);
  minutesElement.textContent = formatNumber(minutes);
  secondsElement.textContent = formatNumber(seconds);
}


/* =========================================================
   START COUNTDOWN
========================================================= */

let countdownInterval;

function initializeCountdown() {

  updateCountdown();

  countdownInterval = setInterval(
    updateCountdown,
    1000
  );
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  refreshComingSoonIcons();

  initializeCountdown();

});