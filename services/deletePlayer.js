import { API_DATABASE } from "../lib/constants.js";

async function deletePlayer(id) {
  try {
    const response = await axios.delete(`${API_DATABASE}/players/${id}`);
  } catch (err) {
    console.log(err);
  }
}

export { deletePlayer };
