/* =========================================================
   SAFE STEP
   LOGIN PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshLoginIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

function initializePasswordToggle() {

    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    const passwordToggle =
        document.getElementById(
            "passwordToggle"
        );


    if (
        !passwordInput ||
        !passwordToggle
    ) {

        return;

    }


    passwordToggle.addEventListener(
        "click",
        () => {

            const isPassword =
                passwordInput.type ===
                "password";


            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";


            passwordToggle.innerHTML =
                isPassword
                    ? '<i data-lucide="eye-off"></i>'
                    : '<i data-lucide="eye"></i>';


            passwordToggle.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );


            passwordToggle.setAttribute(
                "title",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );


            refreshLoginIcons();

        }
    );

}


/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   CLEAR ERRORS
   ========================================================= */

function clearLoginErrors() {

    const emailError =
        document.getElementById(
            "emailError"
        );


    const passwordError =
        document.getElementById(
            "passwordError"
        );


    const emailInput =
        document.getElementById(
            "loginEmail"
        );


    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    if (emailError) {

        emailError.textContent = "";

    }


    if (passwordError) {

        passwordError.textContent = "";

    }


    if (emailInput) {

        emailInput
            .closest(".input-wrapper")
            ?.classList.remove(
                "error",
                "success"
            );

    }


    if (passwordInput) {

        passwordInput
            .closest(".input-wrapper")
            ?.classList.remove(
                "error",
                "success"
            );

    }

}


/* =========================================================
   SHOW ERROR
   ========================================================= */

function showLoginError(
    input,
    errorElement,
    message
) {

    if (errorElement) {

        errorElement.textContent =
            message;

    }


    if (input) {

        input
            .closest(".input-wrapper")
            ?.classList.add(
                "error"
            );

    }

}


/* =========================================================
   LOGIN FORM
   ========================================================= */

function initializeLoginForm() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const emailInput =
        document.getElementById(
            "loginEmail"
        );


    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    const emailError =
        document.getElementById(
            "emailError"
        );


    const passwordError =
        document.getElementById(
            "passwordError"
        );


    const submitButton =
        document.getElementById(
            "loginSubmit"
        );


    if (!loginForm) {

        return;

    }


    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            clearLoginErrors();


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            let isValid = true;


            /* =============================================
               EMAIL
            ============================================== */

            if (!email) {

                showLoginError(
                    emailInput,
                    emailError,
                    "Please enter your email address."
                );

                isValid = false;

            } else if (!isValidEmail(email)) {

                showLoginError(
                    emailInput,
                    emailError,
                    "Please enter a valid email address."
                );

                isValid = false;

            } else {

                emailInput
                    ?.closest(".input-wrapper")
                    ?.classList.add(
                        "success"
                    );

            }


            /* =============================================
               PASSWORD
            ============================================== */

            if (!password) {

                showLoginError(
                    passwordInput,
                    passwordError,
                    "Please enter your password."
                );

                isValid = false;

            } else if (password.length < 6) {

                showLoginError(
                    passwordInput,
                    passwordError,
                    "Password must contain at least 6 characters."
                );

                isValid = false;

            } else {

                passwordInput
                    ?.closest(".input-wrapper")
                    ?.classList.add(
                        "success"
                    );

            }


            if (!isValid) {

                return;

            }


            /* =============================================
               FRONTEND LOGIN PLACEHOLDER
            ============================================== */

            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.innerHTML = `
                    <span>Signing In...</span>
                    <i data-lucide="loader-circle"></i>
                `;


                refreshLoginIcons();

            }


            /*
             * Frontend placeholder.
             *
             * Connect this section to the
             * real authentication API later.
             */

            setTimeout(
                () => {

                    if (submitButton) {

                        submitButton.disabled =
                            false;


                        submitButton.innerHTML = `
                            <span>Sign In</span>
                            <i data-lucide="arrow-right"></i>
                        `;


                        refreshLoginIcons();

                    }


                    /*
                     * Temporary demo behavior.
                     *
                     * Replace with:
                     *
                     * window.location.href =
                     * "dashboard.html";
                     *
                     * after backend authentication
                     * is implemented.
                     */

                    showLoginMessage(
                        "Login form is ready. Connect authentication to continue.",
                        "success"
                    );

                },
                900
            );

        }
    );

}


/* =========================================================
   LOGIN MESSAGE
   ========================================================= */

function showLoginMessage(
    message,
    type = "info"
) {

    let messageBox =
        document.getElementById(
            "loginMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );


        messageBox.id =
            "loginMessage";


        document.body.appendChild(
            messageBox
        );


        const style =
            document.createElement(
                "style"
            );


        style.textContent = `

            #loginMessage {

                position: fixed;

                right: 25px;

                bottom: 25px;

                z-index: 3000;

                max-width: 360px;

                padding: 14px 18px;

                border-radius: 10px;

                background:
                    var(
                        --login-surface,
                        #ffffff
                    );

                color:
                    var(
                        --login-text,
                        #26332c
                    );

                border:
                    1px solid
                    var(
                        --login-border,
                        #dedcd5
                    );

                border-left:
                    3px solid
                    var(
                        --primary,
                        #344E41
                    );

                box-shadow:
                    0 15px 35px
                    rgba(
                        20,
                        25,
                        22,
                        0.16
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


            #loginMessage.show {

                opacity: 1;

                transform:
                    translateY(0);

            }


            #loginMessage.success {

                border-left-color:
                    var(
                        --primary,
                        #344E41
                    );

            }


            #loginMessage.info {

                border-left-color:
                    var(
                        --secondary,
                        #D4B483
                    );

            }


            html[dir="rtl"]
            #loginMessage {

                right: auto;

                left: 25px;

                border-left:
                    1px solid
                    var(
                        --login-border,
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

                #loginMessage {

                    left: 14px;

                    right: 14px;

                    bottom: 14px;

                    max-width: none;

                }


                html[dir="rtl"]
                #loginMessage {

                    left: 14px;

                    right: 14px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    messageBox.textContent =
        message;


    messageBox.className =
        "";


    messageBox.classList.add(
        type
    );


    requestAnimationFrame(
        () => {

            messageBox.classList.add(
                "show"
            );

        }
    );


    clearTimeout(
        window.safeStepLoginMessageTimer
    );


    window.safeStepLoginMessageTimer =
        setTimeout(
            () => {

                messageBox.classList.remove(
                    "show"
                );

            },
            3500
        );

}


/* =========================================================
   SOCIAL LOGIN BUTTONS
   ========================================================= */

function initializeSocialLogin() {

    const googleLogin =
        document.getElementById(
            "googleLogin"
        );


    const appleLogin =
        document.getElementById(
            "appleLogin"
        );


    googleLogin?.addEventListener(
        "click",
        () => {

            showLoginMessage(
                "Google authentication will be connected later.",
                "info"
            );

        }
    );


    appleLogin?.addEventListener(
        "click",
        () => {

            showLoginMessage(
                "Apple authentication will be connected later.",
                "info"
            );

        }
    );

}


/* =========================================================
   REMEMBER ME
   ========================================================= */

function initializeRememberMe() {

    const rememberMe =
        document.getElementById(
            "rememberMe"
        );


    if (!rememberMe) {

        return;

    }


    const saved =
        localStorage.getItem(
            "safeStepRememberMe"
        );


    if (saved === "true") {

        rememberMe.checked =
            true;

    }


    rememberMe.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "safeStepRememberMe",
                rememberMe.checked
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================================
   INPUT FOCUS
   ========================================================= */

function initializeInputBehavior() {

    document
        .querySelectorAll(
            ".login-form input"
        )
        .forEach(
            (input) => {

                input.addEventListener(
                    "input",
                    () => {

                        input
                            .closest(".input-wrapper")
                            ?.classList.remove(
                                "error"
                            );


                        const errorElement =
                            input.id === "loginEmail"
                                ? document.getElementById(
                                    "emailError"
                                )
                                : document.getElementById(
                                    "passwordError"
                                );


                        if (errorElement) {

                            errorElement.textContent =
                                "";

                        }

                    }
                );

            }
        );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        refreshLoginIcons();

        initializePasswordToggle();

        initializeLoginForm();

        initializeSocialLogin();

        initializeRememberMe();

        initializeInputBehavior();

    }
);