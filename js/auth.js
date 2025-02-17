import { showError, clearError, showMessage } from "./utils.js";
import { validateInput } from "./validation.js";
import { loginUser, registerUser, requestPasswordReset, verify2FA } from "./api.js";

/**
 * Handles user login
 */
export function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById("login-username");
  const password = document.getElementById("login-password");

  clearError(username);
  clearError(password);

  let isValid = true;

  // Validate username & password
  if (!validateInput("username", username.value).isValid) {
    showError(username, "Invalid username.");
    isValid = false;
  }
  if (!validateInput("password", password.value).isValid) {
    showError(password, "Invalid password.");
    isValid = false;
  }

  if (!isValid) return;

  try {
    const response = loginUser(username.value, password.value);
    if (response.success) {
      showMessage("Login successful!", "success");
      window.location.href = "/dashboard.html"; // Redirect on success
    } else {
      showError(password, response.message);
    }
  } catch (error) {
    showMessage("Login failed. Try again.", "error");
  }
}

/**
 * Handles user registration
 */
export function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("register-username");
  const email = document.getElementById("register-email");
  const password = document.getElementById("register-password");

  clearError(username);
  clearError(email);
  clearError(password);

  let isValid = true;

  if (!validateInput("username", username.value).isValid) {
    showError(username, "Invalid username.");
    isValid = false;
  }
  if (!validateInput("email", email.value).isValid) {
    showError(email, "Invalid email.");
    isValid = false;
  }
  if (!validateInput("password", password.value).isValid) {
    showError(password, "Weak password.");
    isValid = false;
  }

  if (!isValid) return;

  try {
    const response = registerUser(username.value, email.value, password.value);
    if (response.success) {
      showMessage("Registration successful! Redirecting...", "success");
      setTimeout(() => (window.location.href = "/login.html"), 2000);
    } else {
      showError(username, response.message);
    }
  } catch (error) {
    showMessage("Registration failed.", "error");
  }
}

/**
 * Handles forgot password
 */
export function handleForgotPassword(event) {
  event.preventDefault();
  
  const email = document.getElementById("forgot-email");
  clearError(email);

  if (!validateInput("email", email.value).isValid) {
    showError(email, "Enter a valid email.");
    return;
  }

  try {
    const response = requestPasswordReset(email.value);
    if (response.success) {
      showMessage("Password reset link sent!", "success");
    } else {
      showError(email, response.message);
    }
  } catch (error) {
    showMessage("Failed to send reset link.", "error");
  }
}

/**
 * Handles 2FA verification
 */
export function handle2FAVerification(event) {
  event.preventDefault();
  
  const otp = document.querySelectorAll(".twofa-code");
  const verificationCode = Array.from(inputs).map(input => input.value).join("");

  clearError(otp);

  if (!validateInput("otp", otp.value).isValid) {
    showError(otp, "Invalid OTP.");
    return;
  }

  try {
    const response = verify2FA(otp.value);
    if (response.success) {
      showMessage("2FA verification successful!", "success");
      window.location.href = "/dashboard.html"; // Redirect to dashboard
    } else {
      showError(otp, response.message);
    }
  } catch (error) {
    showMessage("2FA verification failed.", "error");
  }
}

// Attach event listeners
document.getElementById("login-form")?.addEventListener("submit", handleLogin);
document.getElementById("register-form")?.addEventListener("submit", handleRegister);
document.getElementById("forgot-form")?.addEventListener("submit", handleForgotPassword);
document.getElementById("2fa-form")?.addEventListener("submit", handle2FAVerification);
