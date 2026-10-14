
// =========================================================
// HM'S SKILL TRAINING ACADEMY
// Mobile navigation, 3D course cards and current year
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------
    // 1. MOBILE NAVIGATION
    // -----------------------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        function closeMenu() {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the mobile menu when a navigation link is selected.
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu if the user returns to desktop width.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 820) {
                closeMenu();
            }
        });

        // Close the menu when the user clicks outside it.
        document.addEventListener("click", function (event) {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });
    }


    // -----------------------------------------------------
    // 2. 3D TILT EFFECT FOR COURSE CARDS
    // -----------------------------------------------------

    const courseCards = document.querySelectorAll("[data-tilt]");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!reducedMotion && canHover) {

        courseCards.forEach(function (card) {

            card.addEventListener("mousemove", function (event) {

                const rect = card.getBoundingClientRect();

                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate the cursor position relative to the card centre.
                const rotateY = ((mouseX - centerX) / centerX) * 5;
                const rotateX = ((centerY - mouseY) / centerY) * 5;

                card.style.transform =
                    "perspective(1000px) " +
                    "rotateX(" + rotateX + "deg) " +
                    "rotateY(" + rotateY + "deg) " +
                    "translateY(-5px)";

                card.style.boxShadow =
                    "0 25px 50px rgba(20, 51, 97, 0.16)";
            });

            card.addEventListener("mouseleave", function () {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg)";

                card.style.boxShadow = "";
            });
        });
    }


    // -----------------------------------------------------
    // 3. AUTOMATIC FOOTER YEAR
    // -----------------------------------------------------

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // -----------------------------------------------------
    // 4. SMOOTH SCROLL FOR INTERNAL LINKS
    // -----------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "start"
                });

                // Keep the URL in sync with the selected section.
                if (history.replaceState) {
                    history.replaceState(null, "", targetId);
                }
            }
        });
    });

});
