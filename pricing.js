document.querySelectorAll(".pricing-faq-question").forEach((button) => {

    button.addEventListener("click", () => {

        const item = button.closest(".pricing-faq-item");
        const icon = button.querySelector("i");

        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            icon.setAttribute("data-lucide", "minus");
        } else {
            icon.setAttribute("data-lucide", "plus");
        }

        if (window.lucide) {
            lucide.createIcons();
        }

    });

});