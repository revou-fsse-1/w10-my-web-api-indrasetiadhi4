import { API_DATABASE } from "../lib/constants.js";

async function createUser(user) {
  try {
    const response = await axios.post(`${API_DATABASE}/users`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  } catch (err) {
    console.log(err);
  }
}

export { createUser };
