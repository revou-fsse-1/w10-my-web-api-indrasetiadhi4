import { API_DATABASE } from "../lib/constants.js";

async function updatePlayer(player) {
  try {
    const response = await axios.put(`${API_DATABASE}/players/${player.id}`, {
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

export { updatePlayer };
