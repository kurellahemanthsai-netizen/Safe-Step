/* =========================================================
   SAFE STEP — HOME 2 HERO
   PREMIUM HERO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       REFRESH LUCIDE ICONS
       ===================================================== */

    function refreshHome2Icons() {

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }

    refreshHome2Icons();


    /* =====================================================
       HERO SLIDER INDICATORS
       ===================================================== */

    const sliderDots = document.querySelectorAll(
        ".home2-slider-dot"
    );

    sliderDots.forEach((dot) => {

        dot.addEventListener("click", () => {

            sliderDots.forEach((item) => {
                item.classList.remove("active");
            });

            dot.classList.add("active");

        });

    });


    /* =====================================================
       STORY BUTTON
       ===================================================== */

    const storyButton = document.querySelector(
        ".home2-story-button"
    );

    if (storyButton) {

        storyButton.addEventListener("click", () => {

            /*
             * Video functionality can be connected later.
             */

            console.log("Safe Step story button clicked.");

        });

    }


    /* =====================================================
       PARALLAX EFFECT
       ===================================================== */

    const hero = document.querySelector(".home2-hero");
    const heroImage = document.querySelector(".home2-hero-image");

    if (hero && heroImage) {

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            const moveX = x * 12;
            const moveY = y * 8;

            heroImage.style.transform =
                `scale(1.075) translate(${moveX}px, ${moveY}px)`;

        });


        hero.addEventListener("mouseleave", () => {

            heroImage.style.transform =
                "scale(1.06)";

        });

    }


    /* =====================================================
       MOBILE TOUCH SAFETY
       ===================================================== */

    if (window.matchMedia("(hover: none)").matches) {

        if (heroImage) {

            heroImage.style.transform =
                "scale(1.06)";

        }

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const scrollLink = document.querySelector(
        ".home2-scroll"
    );

    if (scrollLink) {

        scrollLink.addEventListener("click", (event) => {

            const targetId =
                scrollLink.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }

});
