/* =========================================================
   SAFE STEP
   404 PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshErrorIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   BACK BUTTON
   ========================================================= */

function initializeBackButton() {

    const backButton =
        document.querySelector(
            ".error-secondary-btn"
        );


    if (!backButton) {

        return;

    }


    backButton.addEventListener(
        "click",
        () => {

            if (
                window.history.length > 1
            ) {

                window.history.back();

            } else {

                window.location.href =
                    "index.html";

            }

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        refreshErrorIcons();

        initializeBackButton();

    }
);