/* =========================================================
   SAFE STEP
   SIGNUP PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshSignupIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function isValidSignupEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   PHONE VALIDATION
   ========================================================= */

function isValidPhone(phone) {

    const cleanedPhone =
        phone.replace(/\s+/g, "");

    return /^[+]?[0-9]{10,15}$/
        .test(cleanedPhone);

}


/* =========================================================
   PASSWORD VALIDATION
   ========================================================= */

function isValidSignupPassword(password) {

    /*
     * Minimum 6 characters.
     */

    return password.length >= 6;

}


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

function initializeSignupPasswordToggle(
    inputId,
    toggleId
) {

    const passwordInput =
        document.getElementById(inputId);


    const passwordToggle =
        document.getElementById(toggleId);


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
                passwordInput.type === "password";


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


            refreshSignupIcons();

        }
    );

}


/* =========================================================
   INITIALIZE PASSWORD TOGGLES
   ========================================================= */

function initializePasswordToggles() {

    initializeSignupPasswordToggle(
        "signupPassword",
        "signupPasswordToggle"
    );


    initializeSignupPasswordToggle(
        "signupConfirmPassword",
        "signupConfirmPasswordToggle"
    );

}


/* =========================================================
   CLEAR SIGNUP ERRORS
   ========================================================= */

function clearSignupErrors() {

    const errorIds = [

        "firstNameError",
        "lastNameError",
        "signupEmailError",
        "phoneError",
        "passwordError",
        "confirmPasswordError"

    ];


    errorIds.forEach(
        (id) => {

            const errorElement =
                document.getElementById(id);


            if (errorElement) {

                errorElement.textContent = "";

            }

        }
    );


    const inputWrappers =
        document.querySelectorAll(
            ".signup-form .input-wrapper"
        );


    inputWrappers.forEach(
        (wrapper) => {

            wrapper.classList.remove(
                "error",
                "success"
            );

        }
    );

}


/* =========================================================
   SHOW SIGNUP ERROR
   ========================================================= */

function showSignupError(
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
            ?.classList.add("error");

    }

}


/* =========================================================
   MARK INPUT SUCCESS
   ========================================================= */

function markSignupSuccess(input) {

    if (input) {

        input
            .closest(".input-wrapper")
            ?.classList.add("success");

    }

}


/* =========================================================
   SIGNUP FORM
   ========================================================= */

function initializeSignupForm() {

    const signupForm =
        document.getElementById(
            "signupForm"
        );


    const firstNameInput =
        document.getElementById(
            "signupFirstName"
        );


    const lastNameInput =
        document.getElementById(
            "signupLastName"
        );


    const emailInput =
        document.getElementById(
            "signupEmail"
        );


    const phoneInput =
        document.getElementById(
            "signupPhone"
        );


    const passwordInput =
        document.getElementById(
            "signupPassword"
        );


    const confirmPasswordInput =
        document.getElementById(
            "signupConfirmPassword"
        );


    const firstNameError =
        document.getElementById(
            "firstNameError"
        );


    const lastNameError =
        document.getElementById(
            "lastNameError"
        );


    const emailError =
        document.getElementById(
            "signupEmailError"
        );


    const phoneError =
        document.getElementById(
            "phoneError"
        );


    const passwordError =
        document.getElementById(
            "passwordError"
        );


    const confirmPasswordError =
        document.getElementById(
            "confirmPasswordError"
        );


    const submitButton =
        document.getElementById(
            "signupSubmit"
        );


    if (!signupForm) {

        return;

    }


    signupForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            clearSignupErrors();


            const firstName =
                firstNameInput
                    ? firstNameInput.value.trim()
                    : "";


            const lastName =
                lastNameInput
                    ? lastNameInput.value.trim()
                    : "";


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            const confirmPassword =
                confirmPasswordInput
                    ? confirmPasswordInput.value
                    : "";


            let isValid = true;


            /* =============================================
               FIRST NAME
            ============================================== */

            if (!firstName) {

                showSignupError(
                    firstNameInput,
                    firstNameError,
                    "Please enter your first name."
                );

                isValid = false;

            } else if (firstName.length < 2) {

                showSignupError(
                    firstNameInput,
                    firstNameError,
                    "First name must contain at least 2 characters."
                );

                isValid = false;

            } else {

                markSignupSuccess(
                    firstNameInput
                );

            }


            /* =============================================
               LAST NAME
            ============================================== */

            if (!lastName) {

                showSignupError(
                    lastNameInput,
                    lastNameError,
                    "Please enter your last name."
                );

                isValid = false;

            } else if (lastName.length < 2) {

                showSignupError(
                    lastNameInput,
                    lastNameError,
                    "Last name must contain at least 2 characters."
                );

                isValid = false;

            } else {

                markSignupSuccess(
                    lastNameInput
                );

            }


            /* =============================================
               EMAIL
            ============================================== */

            if (!email) {

                showSignupError(
                    emailInput,
                    emailError,
                    "Please enter your email address."
                );

                isValid = false;

            } else if (!isValidSignupEmail(email)) {

                showSignupError(
                    emailInput,
                    emailError,
                    "Please enter a valid email address."
                );

                isValid = false;

            } else {

                markSignupSuccess(
                    emailInput
                );

            }


            /* =============================================
               PHONE
            ============================================== */

            if (!phone) {

                showSignupError(
                    phoneInput,
                    phoneError,
                    "Please enter your phone number."
                );

                isValid = false;

            } else if (!isValidPhone(phone)) {

                showSignupError(
                    phoneInput,
                    phoneError,
                    "Please enter a valid phone number."
                );

                isValid = false;

            } else {

                markSignupSuccess(
                    phoneInput
                );

            }


            /* =============================================
               PASSWORD
            ============================================== */

            if (!password) {

                showSignupError(
                    passwordInput,
                    passwordError,
                    "Please create a password."
                );

                isValid = false;

            } else if (!isValidSignupPassword(password)) {

                showSignupError(
                    passwordInput,
                    passwordError,
                    "Password must contain at least 6 characters."
                );

                isValid = false;

            } else {

                markSignupSuccess(
                    passwordInput
                );

            }


            /* =============================================
               CONFIRM PASSWORD
            ============================================== */

            if (!confirmPassword) {

                showSignupError(
                    confirmPasswordInput,
                    confirmPasswordError,
                    "Please confirm your password."
                );

                isValid = false;

            } else if (
                confirmPassword !== password
            ) {

                showSignupError(
                    confirmPasswordInput,
                    confirmPasswordError,
                    "Passwords do not match."
                );

                isValid = false;

            } else {

                markSignupSuccess(
                    confirmPasswordInput
                );

            }


            /* =============================================
               STOP IF INVALID
            ============================================== */

            if (!isValid) {

                return;

            }


            /* =============================================
               FRONTEND SIGNUP PLACEHOLDER
            ============================================== */

            if (submitButton) {

                submitButton.disabled = true;


                submitButton.innerHTML = `
                    <span>Creating Account...</span>
                    <i data-lucide="loader-circle"></i>
                `;


                refreshSignupIcons();

            }


            /*
             * Frontend placeholder.
             *
             * Connect this section to the real
             * registration API later.
             */


            setTimeout(
                () => {

                    if (submitButton) {

                        submitButton.disabled = false;


                        submitButton.innerHTML = `
                            <span>Create Account</span>
                            <i data-lucide="arrow-right"></i>
                        `;


                        refreshSignupIcons();

                    }


                    /*
                     * Temporary demo behavior.
                     *
                     * Replace this with your real
                     * registration API response.
                     */

                    showSignupMessage(
                        "Signup form is ready. Connect registration to continue.",
                        "success"
                    );

                },
                900
            );

        }
    );

}


/* =========================================================
   SIGNUP MESSAGE
   ========================================================= */

function showSignupMessage(
    message,
    type = "info"
) {

    let messageBox =
        document.getElementById(
            "signupMessage"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );


        messageBox.id =
            "signupMessage";


        document.body.appendChild(
            messageBox
        );


        const style =
            document.createElement(
                "style"
            );


        style.textContent = `

            #signupMessage {

                position: fixed;

                right: 25px;

                bottom: 25px;

                z-index: 3000;

                max-width: 360px;

                padding: 14px 18px;

                border-radius: 10px;

                background:
                    var(
                        --signup-surface,
                        #ffffff
                    );

                color:
                    var(
                        --signup-text,
                        #26332c
                    );

                border:
                    1px solid
                    var(
                        --signup-border,
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


            #signupMessage.show {

                opacity: 1;

                transform:
                    translateY(0);

            }


            #signupMessage.success {

                border-left-color:
                    var(
                        --primary,
                        #344E41
                    );

            }


            #signupMessage.info {

                border-left-color:
                    var(
                        --secondary,
                        #D4B483
                    );

            }


            html[dir="rtl"]
            #signupMessage {

                right: auto;

                left: 25px;

                border-left:
                    1px solid
                    var(
                        --signup-border,
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

                #signupMessage {

                    left: 14px;

                    right: 14px;

                    bottom: 14px;

                    max-width: none;

                }


                html[dir="rtl"]
                #signupMessage {

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


    messageBox.className = "";


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
        window.safeStepSignupMessageTimer
    );


    window.safeStepSignupMessageTimer =
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
   SOCIAL SIGNUP
   ========================================================= */

function initializeSocialSignup() {

    const googleSignup =
        document.getElementById(
            "googleSignup"
        );


    const appleSignup =
        document.getElementById(
            "appleSignup"
        );


    googleSignup?.addEventListener(
        "click",
        () => {

            showSignupMessage(
                "Google authentication will be connected later.",
                "info"
            );

        }
    );


    appleSignup?.addEventListener(
        "click",
        () => {

            showSignupMessage(
                "Apple authentication will be connected later.",
                "info"
            );

        }
    );

}


/* =========================================================
   INPUT BEHAVIOR
   ========================================================= */

function initializeSignupInputBehavior() {

    const inputs =
        document.querySelectorAll(
            ".signup-form input"
        );


    inputs.forEach(
        (input) => {

            input.addEventListener(
                "input",
                () => {

                    input
                        .closest(".input-wrapper")
                        ?.classList.remove(
                            "error"
                        );


                    /*
                     * Find the error element
                     * associated with this input.
                     */

                    const errorMap = {

                        signupFirstName:
                            "firstNameError",

                        signupLastName:
                            "lastNameError",

                        signupEmail:
                            "signupEmailError",

                        signupPhone:
                            "phoneError",

                        signupPassword:
                            "passwordError",

                        signupConfirmPassword:
                            "confirmPasswordError"

                    };


                    const errorId =
                        errorMap[input.id];


                    if (errorId) {

                        const errorElement =
                            document.getElementById(
                                errorId
                            );


                        if (errorElement) {

                            errorElement.textContent =
                                "";

                        }

                    }

                }
            );

        }
    );

}


/* =========================================================
   CONFIRM PASSWORD LIVE VALIDATION
   ========================================================= */

function initializeConfirmPasswordValidation() {

    const passwordInput =
        document.getElementById(
            "signupPassword"
        );


    const confirmPasswordInput =
        document.getElementById(
            "signupConfirmPassword"
        );


    const confirmPasswordError =
        document.getElementById(
            "confirmPasswordError"
        );


    if (
        !passwordInput ||
        !confirmPasswordInput
    ) {

        return;

    }


    confirmPasswordInput.addEventListener(
        "input",
        () => {

            const password =
                passwordInput.value;


            const confirmPassword =
                confirmPasswordInput.value;


            if (!confirmPassword) {

                confirmPasswordInput
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "success"
                    );

                return;

            }


            if (
                password ===
                confirmPassword
            ) {

                confirmPasswordInput
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "error"
                    );

                confirmPasswordInput
                    .closest(".input-wrapper")
                    ?.classList.add(
                        "success"
                    );


                if (confirmPasswordError) {

                    confirmPasswordError.textContent =
                        "";

                }

            } else {

                confirmPasswordInput
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "success"
                    );

            }

        }
    );

}


/* =========================================================
   PASSWORD STRENGTH / LIVE STATE
   ========================================================= */

function initializePasswordBehavior() {

    const passwordInput =
        document.getElementById(
            "signupPassword"
        );


    const passwordError =
        document.getElementById(
            "passwordError"
        );


    if (!passwordInput) {

        return;

    }


    passwordInput.addEventListener(
        "input",
        () => {

            const password =
                passwordInput.value;


            if (!password) {

                passwordInput
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "success"
                    );

                return;

            }


            if (
                password.length >= 6
            ) {

                passwordInput
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "error"
                    );

                passwordInput
                    .closest(".input-wrapper")
                    ?.classList.add(
                        "success"
                    );


                if (passwordError) {

                    passwordError.textContent =
                        "";

                }

            } else {

                passwordInput
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "success"
                    );

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

        refreshSignupIcons();

        initializePasswordToggles();

        initializeSignupForm();

        initializeSocialSignup();

        initializeSignupInputBehavior();

        initializeConfirmPasswordValidation();

        initializePasswordBehavior();

    }
);