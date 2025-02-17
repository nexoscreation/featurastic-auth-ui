const API_BASE_URL = "https://api.example.com/auth"; // Update with your backend URL

/**
 * Logs in a user
 */
export async function loginUser(username, password) {
  return apiRequest("/login", { username, password });
}

/**
 * Registers a new user
 */
export async function registerUser(username, email, password) {
  return apiRequest("/register", { username, email, password });
}

/**
 * Requests a password reset
 */
export async function requestPasswordReset(email) {
  return apiRequest("/forgot-password", { email });
}

/**
 * Verifies 2FA code
 */
export async function verify2FA(otp) {
  return apiRequest("/verify-2fa", { otp });
}

/**
 * Generic API request function
 */
async function apiRequest(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    return { success: false, message: "Something went wrong!" };
  }
}
