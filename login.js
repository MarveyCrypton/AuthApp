const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let valid = true;

  // validation
  if (!email.value.includes("@")) {
    document.getElementById("emailError").textContent = "Enter valid email";
    valid = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  if (password.value.length < 6) {
    document.getElementById("passwordError").textContent = "Min 6 characters";
    valid = false;
  } else {
    document.getElementById("passwordError").textContent = "";
  }

  // send to backend
  if (valid) {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    alert(data.message);

   if (data.message === "Login successful") {
  localStorage.setItem("userEmail", email.value);
  window.location.href = "dashboard.html";
}
  }
});