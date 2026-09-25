/* =========================================================
   SAFE STEP — CLIENT DASHBOARD
   Dashboard JavaScript
   ========================================================= */


/* =========================================================
   INITIALIZE DASHBOARD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeDashboard();
});


function initializeDashboard() {

    initializeSidebar();
    initializePanels();

    /* Shared website theme + RTL */
    initializeTheme();
    initializeRTL();

    initializeSearch();
    initializeNotifications();
    initializeProfileDropdown();
    initializeQuickActions();
    initializeForms();
    initializeSettings();
    initializeLogout();
    initializeOutsideClick();

    refreshLucideIcons();
}


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshLucideIcons() {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}


/* =========================================================
   SIDEBAR
   ========================================================= */

function initializeSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const sidebarCollapseBtn =
        document.getElementById("sidebarCollapseBtn");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebarCloseBtn =
        document.getElementById("sidebarClose");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    if (!sidebar) {
        return;
    }


    /* =====================================================
       DESKTOP SIDEBAR COLLAPSE
       ===================================================== */

    if (sidebarCollapseBtn) {

        sidebarCollapseBtn.addEventListener(
            "click",
            () => {

                /*
                 * Desktop only.
                 *
                 * Mobile/tablet uses hamburger.
                 */

                if (window.innerWidth <= 1024) {
                    return;
                }


                document.body.classList.toggle(
                    "sidebar-collapsed"
                );


                localStorage.setItem(
                    "safeStepSidebarCollapsed",
                    document.body.classList.contains(
                        "sidebar-collapsed"
                    )
                );

            }
        );

    }


    /* =====================================================
       RESTORE DESKTOP SIDEBAR COLLAPSE
       ===================================================== */

    const savedCollapsedState =
        localStorage.getItem(
            "safeStepSidebarCollapsed"
        );


    if (
        savedCollapsedState === "true" &&
        window.innerWidth > 1024
    ) {

        document.body.classList.add(
            "sidebar-collapsed"
        );

    }


    /* =====================================================
       RESTORE DESKTOP SIDEBAR HIDDEN STATE
       ===================================================== */

    const savedHiddenState =
        localStorage.getItem(
            "safeStepSidebarHidden"
        );


    if (
        savedHiddenState === "true" &&
        window.innerWidth > 1024
    ) {

        document.body.classList.add(
            "sidebar-hidden"
        );

    }


    /* =====================================================
       MOBILE / TABLET HAMBURGER
       ===================================================== */

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            () => {

                /*
                 * Mobile / Tablet
                 */

                if (window.innerWidth <= 1024) {

                    const isOpen =
                        sidebar.classList.contains(
                            "mobile-open"
                        );


                    if (isOpen) {

                        closeMobileSidebar();

                    } else {

                        openMobileSidebar();

                    }

                    return;
                }


                /*
                 * Desktop
                 *
                 * Hamburger is not used on desktop.
                 *
                 * Desktop sidebar is controlled only
                 * by sidebarCollapseBtn.
                 */

                return;

            }
        );

    }


    /* =====================================================
       SIDEBAR CLOSE BUTTON
       ===================================================== */

    if (sidebarCloseBtn) {

        sidebarCloseBtn.addEventListener(
            "click",
            () => {

                closeMobileSidebar();

            }
        );

    }


    /* =====================================================
       SIDEBAR OVERLAY
       ===================================================== */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            () => {

                closeMobileSidebar();

            }
        );

    }


    /* =====================================================
       CLOSE SIDEBAR AFTER NAVIGATION
       ===================================================== */

    document
        .querySelectorAll(
            ".nav-item[data-panel]"
        )
        .forEach((item) => {

            item.addEventListener(
                "click",
                () => {

                    if (window.innerWidth <= 1024) {

                        closeMobileSidebar();

                    }

                }
            );

        });


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 1024) {

                closeMobileSidebar();


                /*
                 * Restore desktop sidebar state.
                 */

                const savedHidden =
                    localStorage.getItem(
                        "safeStepSidebarHidden"
                    ) === "true";


                document.body.classList.toggle(
                    "sidebar-hidden",
                    savedHidden
                );


                const savedCollapsed =
                    localStorage.getItem(
                        "safeStepSidebarCollapsed"
                    ) === "true";


                document.body.classList.toggle(
                    "sidebar-collapsed",
                    savedCollapsed
                );

            } else {

                /*
                 * Remove desktop-only states.
                 */

                document.body.classList.remove(
                    "sidebar-hidden"
                );


                document.body.classList.remove(
                    "sidebar-collapsed"
                );


                closeMobileSidebar();

            }


            updateHamburgerButton();

        }
    );


    updateHamburgerButton();

}


/* =========================================================
   OPEN MOBILE SIDEBAR
   ========================================================= */

function openMobileSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");


    if (sidebar) {

        sidebar.classList.add(
            "mobile-open"
        );

    }


    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }


    document.body.classList.add(
        "sidebar-open"
    );


    if (mobileMenuBtn) {

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    updateHamburgerButton();

}


/* =========================================================
   CLOSE MOBILE SIDEBAR
   ========================================================= */

function closeMobileSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");


    if (sidebar) {

        sidebar.classList.remove(
            "mobile-open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "sidebar-open"
    );


    if (mobileMenuBtn) {

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    updateHamburgerButton();

}


/* =========================================================
   HAMBURGER STATE
   ========================================================= */

function updateHamburgerButton() {

    const button =
        document.getElementById(
            "mobileMenuBtn"
        );

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!button) {
        return;
    }


    /*
     * Hamburger is only relevant on
     * mobile/tablet.
     */

    if (window.innerWidth > 1024) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.setAttribute(
            "aria-label",
            "Menu unavailable on desktop"
        );

        return;

    }


    const mobileOpen =
        sidebar &&
        sidebar.classList.contains(
            "mobile-open"
        );


    button.setAttribute(
        "aria-expanded",
        String(mobileOpen)
    );


    button.setAttribute(
        "aria-label",
        mobileOpen
            ? "Close menu"
            : "Open menu"
    );

}


/* =========================================================
   PANEL SYSTEM
   ========================================================= */

function initializePanels() {

    const navItems =
        document.querySelectorAll(
            ".nav-item[data-panel]"
        );


    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                const panelName =
                    item.getAttribute(
                        "data-panel"
                    );


                if (panelName) {

                    switchPanel(
                        panelName
                    );

                }

            }
        );

    });


    /* =====================================================
       PROFILE LINK
       ===================================================== */

    const profileLink =
        document.getElementById(
            "profileLink"
        );


    if (profileLink) {

        profileLink.addEventListener(
            "click",
            () => {

                switchPanel("profile");

                closeProfileDropdown();

            }
        );

    }


    /* =====================================================
       DASHBOARD LINK
       ===================================================== */

    const dashboardLink =
        document.getElementById(
            "dashboardLink"
        );


    if (dashboardLink) {

        dashboardLink.addEventListener(
            "click",
            () => {

                switchPanel("dashboard");

                closeProfileDropdown();

            }
        );

    }


    /* =====================================================
       RESTORE ACTIVE PANEL
       ===================================================== */

    const savedPanel =
        localStorage.getItem(
            "safeStepActivePanel"
        );


    if (
        savedPanel &&
        document.getElementById(
            `panel-${savedPanel}`
        )
    ) {

        switchPanel(
            savedPanel
        );

    } else {

        switchPanel(
            "dashboard"
        );

    }

}


/* =========================================================
   SWITCH PANEL
   ========================================================= */

function switchPanel(panelName) {

    const panels =
        document.querySelectorAll(
            ".dashboard-panel"
        );


    const navItems =
        document.querySelectorAll(
            ".nav-item[data-panel]"
        );


    /* =====================================================
       HIDE ALL PANELS
       ===================================================== */

    panels.forEach(
        (panel) => {

            panel.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       SHOW SELECTED PANEL
       ===================================================== */

    const selectedPanel =
        document.getElementById(
            `panel-${panelName}`
        );


    if (!selectedPanel) {
        return;
    }


    selectedPanel.classList.add(
        "active"
    );


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    navItems.forEach(
        (item) => {

            item.classList.remove(
                "active"
            );


            if (
                item.getAttribute(
                    "data-panel"
                ) === panelName
            ) {

                item.classList.add(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       PAGE TITLES
       ===================================================== */

    const pageTitles = {

        dashboard:
            "Dashboard",

        installation:
            "Installation Project",

        maintenance:
            "Maintenance",

        warranty:
            "Warranty & Service",

        technicians:
            "Technician Visits",

        invoices:
            "Invoices & Payments",

        profile:
            "My Profile",

        settings:
            "Settings"

    };


    const pageTitle =
        document.getElementById(
            "pageTitle"
        );


    if (pageTitle) {

        pageTitle.textContent =
            pageTitles[panelName] ||
            "Dashboard";

    }


    /* =====================================================
       SAVE ACTIVE PANEL
       ===================================================== */

    localStorage.setItem(
        "safeStepActivePanel",
        panelName
    );


    /* =====================================================
       SCROLL TOP
       ===================================================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    refreshLucideIcons();

}


/* =========================================================
   DARK MODE
   SHARED WITH GLOBAL.JS
   ========================================================= */

function initializeTheme() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    const settingsThemeToggle =
        document.getElementById(
            "settingsThemeToggle"
        );


    /* =====================================================
       RESTORE SHARED THEME
       ===================================================== */

    const savedDarkMode =
        localStorage.getItem(
            "safe-step-dark-mode"
        ) === "true";


    document.body.classList.toggle(
        "dark-mode",
        savedDarkMode
    );


    /* =====================================================
       UPDATE CONTROLS
       ===================================================== */

    updateThemeIcons(
        savedDarkMode
    );


    if (settingsThemeToggle) {

        settingsThemeToggle.checked =
            savedDarkMode;

    }


    /* =====================================================
       HEADER TOGGLE
       ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                const newState =
                    !isDark;


                document.body.classList.toggle(
                    "dark-mode",
                    newState
                );


                localStorage.setItem(
                    "safe-step-dark-mode",
                    newState
                        ? "true"
                        : "false"
                );


                updateThemeIcons(
                    newState
                );


                if (settingsThemeToggle) {

                    settingsThemeToggle.checked =
                        newState;

                }

            }
        );

    }


    /* =====================================================
       SETTINGS TOGGLE
       ===================================================== */

    if (settingsThemeToggle) {

        settingsThemeToggle.addEventListener(
            "change",
            () => {

                const newState =
                    settingsThemeToggle.checked;


                document.body.classList.toggle(
                    "dark-mode",
                    newState
                );


                localStorage.setItem(
                    "safe-step-dark-mode",
                    newState
                        ? "true"
                        : "false"
                );


                updateThemeIcons(
                    newState
                );

            }
        );

    }

}


/* =========================================================
   ENABLE DARK MODE
   ========================================================= */

function enableDarkMode() {

    document.body.classList.add(
        "dark-mode"
    );


    localStorage.setItem(
        "safe-step-dark-mode",
        "true"
    );


    updateThemeIcons(
        true
    );


    const settingsThemeToggle =
        document.getElementById(
            "settingsThemeToggle"
        );


    if (settingsThemeToggle) {

        settingsThemeToggle.checked =
            true;

    }

}


/* =========================================================
   DISABLE DARK MODE
   ========================================================= */

function disableDarkMode() {

    document.body.classList.remove(
        "dark-mode"
    );


    localStorage.setItem(
        "safe-step-dark-mode",
        "false"
    );


    updateThemeIcons(
        false
    );


    const settingsThemeToggle =
        document.getElementById(
            "settingsThemeToggle"
        );


    if (settingsThemeToggle) {

        settingsThemeToggle.checked =
            false;

    }

}


/* =========================================================
   UPDATE THEME ICON
   ========================================================= */

function updateThemeIcons(
    isDark
) {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    if (!themeToggle) {
        return;
    }


    themeToggle.innerHTML =
        isDark
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';


    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );


    themeToggle.setAttribute(
        "title",
        isDark
            ? "Light Mode"
            : "Dark Mode"
    );


    themeToggle.setAttribute(
        "aria-pressed",
        isDark
            ? "true"
            : "false"
    );


    refreshLucideIcons();

}


/* =========================================================
   RTL
   SHARED WITH GLOBAL.JS
   ========================================================= */

function initializeRTL() {

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );

    const settingsRTLToggler =
        document.getElementById(
            "settingsRtlToggle"
        );


    /* =====================================================
       RESTORE SHARED RTL STATE
       ===================================================== */

    const savedRTL =
        localStorage.getItem(
            "safe-step-rtl-mode"
        ) === "true";


    applyDashboardRTL(
        savedRTL
    );


    /* =====================================================
       DASHBOARD HEADER RTL TOGGLE
       ===================================================== */

    if (rtlToggle) {

        rtlToggle.addEventListener(
            "click",
            (event) => {

                /*
                 * IMPORTANT
                 *
                 * global.js also has an RTL listener.
                 * Stop the event here so the dashboard
                 * does not toggle twice.
                 */

                event.preventDefault();
                event.stopImmediatePropagation();


                const isRTL =
                    document.documentElement.getAttribute(
                        "dir"
                    ) === "rtl";


                applyDashboardRTL(
                    !isRTL
                );

            }
        );

    }


    /* =====================================================
       SETTINGS RTL TOGGLE
       ===================================================== */

    if (settingsRTLToggler) {

        settingsRTLToggler.addEventListener(
            "change",
            () => {

                applyDashboardRTL(
                    settingsRTLToggler.checked
                );

            }
        );

    }

}


/* =========================================================
   APPLY DASHBOARD RTL
   ========================================================= */

function applyDashboardRTL(
    isRTL
) {

    const direction =
        isRTL
            ? "rtl"
            : "ltr";


    /* =====================================================
       BODY CLASS
       ===================================================== */

    document.body.classList.toggle(
        "rtl",
        isRTL
    );


    /* =====================================================
       BODY DIRECTION
       ===================================================== */

    document.body.setAttribute(
        "dir",
        direction
    );


    /* =====================================================
       HTML DIRECTION
       ===================================================== */

    document.documentElement.setAttribute(
        "dir",
        direction
    );


    /* =====================================================
       LANGUAGE
       ===================================================== */

    document.documentElement.setAttribute(
        "lang",
        isRTL
            ? "ar"
            : "en"
    );


    /* =====================================================
       SHARED STORAGE KEY
       ===================================================== */

    localStorage.setItem(
        "safe-step-rtl-mode",
        isRTL
            ? "true"
            : "false"
    );


    /* =====================================================
       SETTINGS SWITCH
       ===================================================== */

    const settingsRTLToggler =
        document.getElementById(
            "settingsRtlToggle"
        );


    if (settingsRTLToggler) {

        settingsRTLToggler.checked =
            isRTL;

    }


    updateRTLIcon(
        isRTL
    );

}


/* =========================================================
   ENABLE RTL
   ========================================================= */

function enableRTL() {

    applyDashboardRTL(
        true
    );

}


/* =========================================================
   DISABLE RTL
   ========================================================= */

function disableRTL() {

    applyDashboardRTL(
        false
    );

}


/* =========================================================
   RTL ICON
   ========================================================= */

function updateRTLIcon(
    isRTL
) {

    const rtlToggle =
        document.getElementById(
            "rtlToggle"
        );


    if (!rtlToggle) {
        return;
    }


    rtlToggle.innerHTML =
        '<i data-lucide="arrow-left-right"></i>';


    rtlToggle.setAttribute(
        "aria-label",
        isRTL
            ? "Switch to left-to-right"
            : "Switch to right-to-left"
    );


    rtlToggle.setAttribute(
        "title",
        isRTL
            ? "LTR Mode"
            : "RTL Mode"
    );


    rtlToggle.setAttribute(
        "aria-pressed",
        isRTL
            ? "true"
            : "false"
    );


    refreshLucideIcons();

}


/* =========================================================
   SEARCH
   ========================================================= */

function initializeSearch() {

    /*
     * The HTML has the input itself as:
     *
     * id="dashboardSearch"
     */

    const searchInput =
        document.getElementById(
            "dashboardSearch"
        );


    if (!searchInput) {
        return;
    }


    /* =====================================================
       SEARCH INPUT
       ===================================================== */

    searchInput.addEventListener(
        "input",
        (event) => {

            const searchTerm =
                event.target.value
                    .trim()
                    .toLowerCase();


            if (!searchTerm) {

                clearSearchHighlight();

                return;

            }


            searchDashboard(
                searchTerm
            );

        }
    );


    /* =====================================================
       ESCAPE
       ===================================================== */

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                searchInput.value =
                    "";

                clearSearchHighlight();

                searchInput.blur();

            }

        }
    );

}


/* =========================================================
   SEARCH DASHBOARD
   ========================================================= */

function searchDashboard(
    searchTerm
) {

    const activePanel =
        document.querySelector(
            ".dashboard-panel.active"
        );


    if (!activePanel) {
        return;
    }


    clearSearchHighlight();


    const searchableElements =
        activePanel.querySelectorAll(
            "h2, h3, h4, p, span, strong, td"
        );


    for (
        const element of searchableElements
    ) {

        const text =
            element.textContent
                .trim()
                .toLowerCase();


        if (
            text.includes(
                searchTerm
            )
        ) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            element.classList.add(
                "dashboard-search-match"
            );


            setTimeout(
                () => {

                    element.classList.remove(
                        "dashboard-search-match"
                    );

                },
                1800
            );


            break;

        }

    }

}


/* =========================================================
   CLEAR SEARCH
   ========================================================= */

function clearSearchHighlight() {

    document
        .querySelectorAll(
            ".dashboard-search-match"
        )
        .forEach(
            (element) => {

                element.classList.remove(
                    "dashboard-search-match"
                );

            }
        );

}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function initializeNotifications() {

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    if (!notificationBtn) {
        return;
    }


    notificationBtn.addEventListener(
        "click",
        () => {

            showDashboardMessage(
                "You have 2 new project updates.",
                "notification"
            );


            const badge =
                notificationBtn.querySelector(
                    ".notification-badge"
                );


            if (badge) {

                badge.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   PROFILE DROPDOWN
   ========================================================= */

function initializeProfileDropdown() {

    const profileToggle =
        document.getElementById(
            "profileToggle"
        );


    const profileDropdown =
        document.querySelector(
            ".profile-dropdown"
        );


    const profileMenu =
        document.getElementById(
            "profileMenu"
        );


    if (
        !profileToggle ||
        !profileDropdown ||
        !profileMenu
    ) {

        return;

    }


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    profileToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    /* =====================================================
       TOGGLE
       ===================================================== */

    profileToggle.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                profileMenu.classList.contains(
                    "active"
                );


            closeProfileDropdown();


            if (!isOpen) {

                profileMenu.classList.add(
                    "active"
                );


                profileToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE PROFILE DROPDOWN
   ========================================================= */

function closeProfileDropdown() {

    const profileMenu =
        document.getElementById(
            "profileMenu"
        );


    const profileToggle =
        document.getElementById(
            "profileToggle"
        );


    if (profileMenu) {

        profileMenu.classList.remove(
            "active"
        );

    }


    if (profileToggle) {

        profileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =========================================================
   QUICK ACTIONS
   ========================================================= */

function initializeQuickActions() {

    document
        .querySelectorAll(
            "[data-open-panel]"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const targetPanel =
                            button.getAttribute(
                                "data-open-panel"
                            );


                        if (
                            targetPanel
                        ) {

                            switchPanel(
                                targetPanel
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   FORMS
   ========================================================= */

function initializeForms() {

    /*
     * The form itself has:
     *
     * <form class="profile-form">
     */

    const profileForm =
        document.querySelector(
            ".profile-form"
        );


    if (!profileForm) {
        return;
    }


    profileForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            showDashboardMessage(
                "Profile details saved successfully.",
                "success"
            );

        }
    );

}


/* =========================================================
   SAVE PROFILE BUTTON
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const saveButton =
            event.target.closest(
                "#saveProfileBtn"
            );


        if (!saveButton) {
            return;
        }


        const profileForm =
            document.querySelector(
                ".profile-form"
            );


        if (
            profileForm &&
            typeof profileForm.requestSubmit ===
                "function"
        ) {

            profileForm.requestSubmit();

        } else {

            showDashboardMessage(
                "Profile details saved successfully.",
                "success"
            );

        }

    }
);


/* =========================================================
   SETTINGS
   ========================================================= */

function initializeSettings() {

    /*
     * The current HTML does not provide IDs
     * for notification/email checkboxes.
     *
     * Therefore we locate them from the settings
     * panel using their labels/content.
     */

    const settingsPanel =
        document.getElementById(
            "panel-settings"
        );


    if (!settingsPanel) {
        return;
    }


    const checkboxes =
        settingsPanel.querySelectorAll(
            'input[type="checkbox"]'
        );


    checkboxes.forEach(
        (checkbox) => {

            const row =
                checkbox.closest(
                    ".settings-row"
                );


            if (!row) {
                return;
            }


            const title =
                row.querySelector(
                    ".settings-row-content h3"
                );


            if (!title) {
                return;
            }


            const titleText =
                title.textContent
                    .trim()
                    .toLowerCase();


            /* -----------------------------------------
               Notification setting
            ----------------------------------------- */

            if (
                titleText.includes(
                    "notification"
                )
            ) {

                const saved =
                    localStorage.getItem(
                        "safeStepNotifications"
                    );


                if (saved !== null) {

                    checkbox.checked =
                        saved === "true";

                }


                checkbox.addEventListener(
                    "change",
                    () => {

                        localStorage.setItem(
                            "safeStepNotifications",
                            checkbox.checked
                        );

                    }
                );

            }


            /* -----------------------------------------
               Email setting
            ----------------------------------------- */

            if (
                titleText.includes(
                    "email"
                )
            ) {

                const saved =
                    localStorage.getItem(
                        "safeStepEmailUpdates"
                    );


                if (saved !== null) {

                    checkbox.checked =
                        saved === "true";

                }


                checkbox.addEventListener(
                    "change",
                    () => {

                        localStorage.setItem(
                            "safeStepEmailUpdates",
                            checkbox.checked
                        );

                    }
                );

            }

        }
    );

}


/* =========================================================
   LOGOUT
   ========================================================= */

function initializeLogout() {

    const logoutButtons =
        document.querySelectorAll(
            ".sidebar-logout, #profileLogout"
        );


    logoutButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const confirmLogout =
                        window.confirm(
                            "Are you sure you want to log out?"
                        );


                    if (!confirmLogout) {
                        return;
                    }


                    /*
                     * Frontend placeholder.
                     *
                     * Replace this section with
                     * real authentication logout/API
                     * when backend authentication
                     * is added.
                     */

                    localStorage.removeItem(
                        "safeStepActivePanel"
                    );


                    closeProfileDropdown();

                    closeMobileSidebar();


                    showDashboardMessage(
                        "Logout functionality will be connected to authentication.",
                        "info"
                    );

                }
            );

        }
    );

}


/* =========================================================
   OUTSIDE CLICK
   ========================================================= */

function initializeOutsideClick() {

    document.addEventListener(
        "click",
        (event) => {

            /* =================================================
               PROFILE DROPDOWN
            ================================================= */

            const profileDropdown =
                document.querySelector(
                    ".profile-dropdown"
                );


            if (
                profileDropdown &&
                !profileDropdown.contains(
                    event.target
                )
            ) {

                closeProfileDropdown();

            }


            /* =================================================
               MOBILE SIDEBAR
            ================================================= */

            const sidebar =
                document.getElementById(
                    "sidebar"
                );


            const mobileMenuBtn =
                document.getElementById(
                    "mobileMenuBtn"
                );


            if (
                window.innerWidth <= 1024 &&
                document.body.classList.contains(
                    "sidebar-open"
                ) &&
                sidebar &&
                !sidebar.contains(
                    event.target
                ) &&
                mobileMenuBtn &&
                !mobileMenuBtn.contains(
                    event.target
                )
            ) {

                closeMobileSidebar();

            }

        }
    );

}


/* =========================================================
   DASHBOARD MESSAGE
   ========================================================= */

function showDashboardMessage(
    message,
    type = "info"
) {

    let messageBox =
        document.getElementById(
            "dashboardMessage"
        );


    /* =====================================================
       CREATE MESSAGE BOX
    ===================================================== */

    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );


        messageBox.id =
            "dashboardMessage";


        document.body.appendChild(
            messageBox
        );


        const style =
            document.createElement(
                "style"
            );


        style.textContent = `

            #dashboardMessage {

                position: fixed;

                right: 25px;
                bottom: 25px;

                z-index: 3000;

                max-width: 330px;

                padding: 13px 16px;

                background:
                    var(
                        --dashboard-surface,
                        #ffffff
                    );

                color:
                    var(
                        --dashboard-text,
                        #26332c
                    );

                border:
                    1px solid
                    var(
                        --dashboard-border,
                        #dedcd5
                    );

                border-left:
                    3px solid
                    var(
                        --primary,
                        #344E41
                    );

                border-radius: 9px;

                box-shadow:
                    0 14px 35px
                    rgba(
                        20,
                        25,
                        22,
                        0.15
                    );

                font-family:
                    "Raleway",
                    sans-serif;

                font-size: 11px;

                font-weight: 600;

                opacity: 0;

                transform:
                    translateY(10px);

                transition:
                    opacity 0.25s ease,
                    transform 0.25s ease;

            }


            #dashboardMessage.show {

                opacity: 1;

                transform:
                    translateY(0);

            }


            #dashboardMessage.success {

                border-left-color:
                    var(
                        --primary,
                        #344E41
                    );

            }


            #dashboardMessage.notification {

                border-left-color:
                    var(
                        --secondary,
                        #D4B483
                    );

            }


            #dashboardMessage.info {

                border-left-color:
                    var(
                        --primary,
                        #344E41
                    );

            }


            html[dir="rtl"]
            #dashboardMessage {

                right: auto;

                left: 25px;

                border-left:
                    1px solid
                    var(
                        --dashboard-border,
                        #dedcd5
                    );

                border-right:
                    3px solid
                    var(
                        --primary,
                        #344E41
                    );

            }


            @media screen and
            (min-width: 360px) and
            (max-width: 740px) {

                #dashboardMessage {

                    left: 14px;

                    right: 14px;

                    bottom: 14px;

                    max-width: none;

                }


                html[dir="rtl"]
                #dashboardMessage {

                    left: 14px;

                    right: 14px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       MESSAGE CONTENT
    ===================================================== */

    messageBox.textContent =
        message;


    messageBox.className =
        "";


    messageBox.classList.add(
        type
    );


    /* =====================================================
       SHOW
    ===================================================== */

    requestAnimationFrame(
        () => {

            messageBox.classList.add(
                "show"
            );

        }
    );


    /* =====================================================
       CLEAR PREVIOUS TIMER
    ===================================================== */

    clearTimeout(
        window.safeStepMessageTimer
    );


    /* =====================================================
       HIDE
    ===================================================== */

    window.safeStepMessageTimer =
        setTimeout(
            () => {

                messageBox.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeProfileDropdown();


            if (
                window.innerWidth <= 1024
            ) {

                closeMobileSidebar();

            }

        }

    }
);


/* =========================================================
   EXPOSE DASHBOARD FUNCTIONS
   ========================================================= */

window.SafeStepDashboard = {

    switchPanel,

    openMobileSidebar,

    closeMobileSidebar,

    enableDarkMode,

    disableDarkMode,

    enableRTL,

    disableRTL

};