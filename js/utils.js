/**
 * Utility function to debounce input validation to prevent excessive checks.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, delay = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Function to show error messages inline next to the input field.
 * @param {HTMLElement} input - The input field.
 * @param {string} message - The error message to display.
 */
export function showError(input, message) {
  clearError(input);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  input.classList.add("input-error");
  input.setAttribute("aria-invalid", "true");
  input.parentNode.appendChild(errorDiv);
}

/**
 * Function to clear error messages from the input field.
 * @param {HTMLElement} input - The input field.
 */
export function clearError(input) {
  input.classList.remove("input-error");
  input.removeAttribute("aria-invalid");
  const error = input.parentNode.querySelector(".error-message");
  if (error) error.remove();
}

/**
 * Display a success or error message with optional auto-hide.
 * @param {string} message - The message text.
 * @param {string} type - The type of message ("success" or "error").
 * @param {boolean} autoHide - Whether to auto-hide the message after a few seconds.
 */
export function showMessage(message, type = "success", autoHide = true) {
  const messageBox = document.getElementById("message-box");
  if (!messageBox) return;

  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;
  messageBox.style.display = "block";

  if (autoHide) {
    setTimeout(() => (messageBox.style.display = "none"), 3000);
  }
}

/**
 * Initializes password visibility toggle feature.
 * @param {string} passwordInputId - The ID of the password input field.
 * @param {string} toggleButtonId - The ID of the password toggle button.
 */
export function initPasswordToggle(passwordInputId, toggleButtonId) {
  const passwordInput = document.getElementById(passwordInputId);
  const passwordToggle = document.getElementById(toggleButtonId);

  if (!passwordInput || !passwordToggle) return;

  passwordToggle.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";
    passwordInput.type = isPasswordVisible ? "password" : "text";
    passwordToggle.innerHTML = isPasswordVisible ? getSVGLocked() : getSVGUnlocked();
    passwordToggle.setAttribute("aria-label", isPasswordVisible ? "Show password" : "Hide password");
  });
}

/**
 * Generates an SVG markup for a locked (hidden password) icon.
 * @returns {string} - SVG markup string.
 */
export function getSVGLocked() {
  return `
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="#05F1FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
        d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  `;
}

/**
 * Generates an SVG markup for an unlocked (visible password) icon.
 * @returns {string} - SVG markup string.
 */
export function getSVGUnlocked() {
  return `
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="#05F1FF" stroke-width="1" 
        d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z" />
      <path stroke="#05F1FF" stroke-width="1" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  `;
}

// 📌 Auto-focus & restricts input to digits
export function setup2FAInputs() {
  const inputs = document.querySelectorAll(".twofa-code");

  inputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      input.value = input.value.replace(/\D/g, ""); // Allow only digits
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && index > 0 && !input.value) {
        inputs[index - 1].focus();
      }
    });
  });
}

/**
 * End of utils functions.
 */