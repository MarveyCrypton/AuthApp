const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let valid = true;

  // validation
  if (name.value.trim() === "") {
    document.getElementById("nameError").textContent = "Name required";
    valid = false;
  }

  if (!email.value.includes("@")) {
    document.getElementById("emailError").textContent = "Invalid email";
    valid = false;
  }

  if (password.value.length < 6) {
    document.getElementById("passwordError").textContent = "Min 6 characters";
    valid = false;
  }

  // send to backend
  if (valid) {
    const res = await fetch("https://login-system-api-py77.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    alert(data.message);
    form.reset();
  }
});