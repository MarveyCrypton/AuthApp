// show stored user (optional)
const userEmail = localStorage.getItem("userEmail");

if (userEmail) {
  document.getElementById("welcomeText").textContent =
    "Welcome " + userEmail + " 👋";
}

function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}