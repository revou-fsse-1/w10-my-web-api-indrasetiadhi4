import { createUser } from "../services/createUser.js";
import { getAllUsers } from "../services/getUsers.js";

function registerAccount() {
  const formRegister = document.getElementById("form-register");
  formRegister.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-password"
    ).value;

    const users = await getAllUsers();

    const checkUsername = users.some((user) => user.username === username);
    if (checkUsername) {
      alert("Username already exists");
      return;
    }

    const checkEmail = users.some((user) => user.email === email);
    if (checkEmail) {
      alert("Email already exists");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password not match");
      return;
    }

    await createUser({
      username: username,
      email: email,
      password: password,
    });

    alert("Register success");

    window.location.href = "../";
  });
}

addEventListener("DOMContentLoaded", function () {
  registerAccount();
});
