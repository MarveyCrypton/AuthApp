const form = document.getElementById("signupForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear previous errors
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let valid = true;

  // Validation
  if (name === "") {
    document.getElementById("nameError").textContent = "Name is required";
    valid = false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("emailError").textContent = "Please enter a valid email";
    valid = false;
  }

  if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
    valid = false;
  }

  if (!valid) return;

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating Account...";

  try {
    const res = await fetch("https://login-system-api-py77.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Account created successfully!");
      form.reset();
      // Optional: redirect to login after successful signup
      // window.location.href = "login.html";
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Network error. Please check your connection and try again.");
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = "Create Account";
  }
});