import { API_DATABASE } from "../lib/constants.js";

async function createPlayer(player) {
  try {
    const response = await axios.post(`${API_DATABASE}/players`, {
      name: player.name,
      number: player.number,
      position: player.position,
      club: player.club,
      goals: player.goals,
      photo: player.photo,
    });
  } catch (error) {
    console.log(error);
  }
}

export { createPlayer };
