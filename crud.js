const API = "https://64238324001cb9fc20405dab.mockapi.io/api/v1";

async function getAllPlayers() {
  try {
    const API_ENDPOINT = API + "/players";
    const response = await fetch(API_ENDPOINT);
    const result = await response.json();
    console.log("success", result);
  } catch (error) {
    console.log("error", error);
  }
}

async function getPlayerById(playerId) {
  try {
    const API_ENDPOINT = API + "/players/" + playerId;
    const response = await fetch(API_ENDPOINT);
    const result = await response.json();
    console.log("success", result);
  } catch (error) {
    console.log("error", error);
  }
}

async function addPlayer(player) {
  try {
    const API_ENDPOINT = API + "/players";
    const params = {
      method: "POST",
      body: JSON.stringify({
        name: player.name,
        club: player.club,
        position: player.position,
        goals: player.goals,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(API_ENDPOINT, params);
    const result = await response.json();
    console.log("success", result);
  } catch (error) {
    console.log("error", error);
  }
}

async function updatePlayer(player) {
  try {
    const API_ENDPOINT = API + "/players/" + player.id;
    const params = {
      method: "PUT",
      body: JSON.stringify({
        name: player.name,
        club: player.club,
        position: player.position,
        goals: player.goals,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(API_ENDPOINT, params);
    const result = await response.json();
    console.log("success", result);
  } catch (error) {
    console.log("error", error);
  }
}

async function testing() {
  await getPlayerById("10");
  await getAllPlayers();
}

// testing();
// updatePlayer({
//   id: 9,
//   name: "asepin",
//   club: "bekasi fc",
//   position: "supporter",
//   goals: 0,
// });

// addPlayer({
//   name: "thomaz",
//   club: "bekasi fc",
//   position: "supporter",
//   goals: 0,
// });

export { getAllPlayers, getPlayerById, addPlayer, updatePlayer };
