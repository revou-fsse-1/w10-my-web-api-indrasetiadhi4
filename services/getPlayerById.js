import { API_DATABASE } from "../lib/constants.js";

async function getPlayerById(id) {
  try {
    const response = await axios.get(`${API_DATABASE}/players/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export { getPlayerById };
