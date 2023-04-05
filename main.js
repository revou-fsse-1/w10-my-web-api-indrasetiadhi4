import { getAllUsers } from "./services/getUsers.js";

function verifyLogin() {
  const formLogin = document.getElementById("form-login");
  formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const users = await getAllUsers();

    const checkUsername = users.some((user) => user.username === username);
    if (!checkUsername) {
      alert("Username not found");
      return;
    }

    const userDB = users.find((user) => user.username === username);
    const checkPassword = userDB.password === password;
    if (!checkPassword) {
      alert("Incorrect Password");
      return;
    }

    alert("Login success");

    window.location.href = "./dashboard";
  });
}

addEventListener("DOMContentLoaded", function () {
  verifyLogin();
});
