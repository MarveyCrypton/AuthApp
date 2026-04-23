const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  let valid = true;

  // Clear previous errors
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  // Validation
  if (!emailInput.value.trim().includes("@")) {
    document.getElementById("emailError").textContent = "Enter a valid email";
    valid = false;
  }

  if (passwordInput.value.length < 6) {
    document.getElementById("passwordError").textContent = "Min 6 characters";
    valid = false;
  }

  if (!valid) return;

  // Loading state
  const submitBtn = document.querySelector("#loginForm button");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Logging in...";
  }

  try {
    const res = await fetch("https://login-system-api-py77.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value
      })
    });

    const data = await res.json();

    alert(data.message);

    if (data.message === "Login successful" || data.message.toLowerCase().includes("successful")) {
      localStorage.setItem("userEmail", emailInput.value.trim());
      window.location.href = "dashboard.html";
    }

  } catch (err) {
    console.error("Login error:", err);
    alert("Unable to connect to server. Please try again later.");
  } finally {
    // Reset button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Login";
    }
  }
});