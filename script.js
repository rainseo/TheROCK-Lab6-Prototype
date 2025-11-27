// GLOBAL INPUT EFFECTS
document.addEventListener("DOMContentLoaded", () => {

    // Show/Hide Password Toggles
    const toggles = document.querySelectorAll(".toggle-password");

    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            // Traverse up to the parent .input-group and then find the input child
            const inputGroup = toggle.closest('.input-group'); 
            const input = inputGroup ? inputGroup.querySelector('input[type="password"], input[type="text"]') : null;

            if (!input) return; // Exit if input not found

            if (input.type === "password") {
                input.type = "text";
                toggle.classList.remove("fa-eye");
                toggle.classList.add("fa-eye-slash"); // Eye with a slash icon
            } else {
                input.type = "password";
                toggle.classList.remove("fa-eye-slash");
                toggle.classList.add("fa-eye"); // Open eye icon
            }
            input.focus(); 
        });
    });

    // Real-Time Password Match Check (For Sign-Up Page)
    const passField = document.getElementById("signup-pass");
    const confirmField = document.getElementById("signup-confirm");
    const feedbackContainer = document.getElementById("match-feedback");

    if (passField && confirmField) {
        // Listener to both fields to react instantly
        passField.addEventListener("input", checkPasswordMatchLive);
        confirmField.addEventListener("input", checkPasswordMatchLive);
    }
    
    function checkPasswordMatchLive() {
        if (!feedbackContainer) return;

        const pass = passField.value;
        const confirm = confirmField.value;

        // Clear previous feedback
        feedbackContainer.textContent = '';
        feedbackContainer.className = 'match-feedback';

        // Check only if at least one password field has been started
        if (pass.length === 0 && confirm.length === 0) {
            return;
        }

        // Check if passwords are long enough (Min 8 Chars)
        if (pass.length > 0 && pass.length < 8) {
            feedbackContainer.textContent = "⚠️ Password must be at least 8 characters.";
            feedbackContainer.classList.add('warning-text');
            return;
        }

        // Check for match
        if (pass !== '' && confirm !== '') {
            if (pass === confirm) {
                feedbackContainer.textContent = "✅ Passwords match!";
                feedbackContainer.classList.add('success-text');
            } else {
                feedbackContainer.textContent = "❌ Passwords do not match.";
                feedbackContainer.classList.add('error-text');
            }
        }
    }

});

// Helper function to display errors
function displayError(errorBoxId, message) {
    const errorBox = document.getElementById(errorBoxId);
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = "block";
        errorBox.classList.add('active-error'); 
    }
}

// Helper function to clear errors
function clearError(errorBoxId) {
    const errorBox = document.getElementById(errorBoxId);
    if (errorBox) {
        errorBox.textContent = "";
        errorBox.style.display = "none";
        errorBox.classList.remove('active-error');
    }
}

// SIGN IN VALIDATION
function validateSignIn() {
    clearError("signin-error"); // Clear previous errors
    
    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value.trim();

    // 1. Basic validation
    if (email === "" || password === "") {
        displayError("signin-error", "Please enter both your Celestial Pass Email and Realm Password.");
        return false;
    }

    // 2. Robust email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
        displayError("signin-error", "Please ensure your Celestial Pass Email is correctly formatted.");
        return false;
    }

    // 3. Fake credentials check
    if (email !== "user@example.com" || password !== "password123") {
        displayError("signin-error", "Invalid Credentials. Check your email and password.");
        return false;
    }
    
    // 4. Success
    window.location.href = "welcome.html";
    
    return false;
}

// PASSWORD RESET SIMULATION
function validatePasswordReset() {
    clearError("reset-error"); // Clear validation errors
    
    const emailInput = document.getElementById("reset-email");
    const email = emailInput.value.trim();
    const form = document.getElementById("forgot-form");
    const successBox = document.getElementById("reset-success-message");

    // Basic email validation
    if (email === "") {
        displayError("reset-error", "Please enter your email address.");
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
        displayError("reset-error", "Please ensure your email is correctly formatted.");
        return false;
    }

    // --- SIMULATION SUCCESS ---
    console.log("Password reset simulated for:", email);
    
    // Hide the input form
    form.style.display = 'none';

    // Success message
    successBox.textContent = `A password reset link has been sent to ${email}!`;
    successBox.style.display = 'block';

    // Button to go back to sign-in
    const goBackButton = document.createElement('a');
    goBackButton.href = 'signin.html';
    goBackButton.className = 'primary-button';
    goBackButton.style.cssText = 'display: block; margin-top: 20px; text-decoration: none;';
    goBackButton.textContent = 'Return to Sign In';
    
    document.querySelector('.container').appendChild(goBackButton);

    return false;
}

// SIGN UP VALIDATION
function validateFullSignup() {
    clearError("signup-error"); // Clear errors first
    
    // Step 1 Fields
    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    
    // Step 2 Fields
    const pass = document.getElementById("signup-pass").value.trim();
    const confirm = document.getElementById("signup-confirm").value.trim();

    // 1. Check for empty fields
    if (username === "" || email === "" || pass === "" || confirm === "") {
        displayError("signup-error", "Please complete all fields to finalize your Realm profile.");
        return false;
    }

    // 2. Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        displayError("signup-error", "Please enter a valid email to begin your ascent.");
        return false;
    }

    // 3. Password Length Check
    if (pass.length < 8) {
        displayError("signup-error", "Your Realm Password must be at least 8 characters long.");
        return false;
    }

    // 4. Password Match Check
    if (pass !== confirm) {
        displayError("signup-error", "Password Mismatch. Please ensure both passwords match.");
        return false;
    }

    // --- If all checks pass ---
    
    // Success: Simulate account creation and redirect
    console.log("Validation Successful! Creating account for:", username);
    window.location.href = "welcome.html";
    
    return false;
}