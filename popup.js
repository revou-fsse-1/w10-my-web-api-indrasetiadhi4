import { getPlayerById } from "./services/getPlayerById.js";
import { createPlayer } from "./services/createPlayer.js";
import { updatePlayer } from "./services/updatePlayer.js";
import { deletePlayer } from "./services/deletePlayer.js";
import { renderPlayerList } from "./main.js";

function applyPopupFunctionality() {
  const openPopupNewPlayer = document.getElementById("add-player");
  openPopupNewPlayer.addEventListener("click", async function () {
    document.getElementById("input-player-id").value = "";
    document.getElementById("input-player-photo").value = generateAvatar();
    document.getElementById("input-player-name").value = "";
    document.getElementById("input-player-number").value = "";
    document.getElementById("input-player-position").value = "";
    document.getElementById("input-player-club").value = "";
    document.getElementById("input-player-goals").value = "";

    document.getElementById("save-type").value = "CREATE";

    const popupForm = document.getElementById("container-popup");
    popupForm.style.display = "flex";

    const deleteButton = document.getElementById("delete-button");
    deleteButton.style.display = "none";
  });

  const openPopupUpdatePlayer = document.querySelectorAll(".button-edit");
  openPopupUpdatePlayer.forEach((card) => {
    card.addEventListener("click", async function () {
      const cardId = card.attributes.id.value.slice(12);
      const player = await getPlayerById(cardId);

      document.getElementById("input-player-id").value = player.id;
      document.getElementById("input-player-photo").value = player.photo;
      document.getElementById("input-player-name").value = player.name;
      document.getElementById("input-player-number").value = player.number;
      document.getElementById("input-player-position").value = player.position;
      document.getElementById("input-player-club").value = player.club;
      document.getElementById("input-player-goals").value = player.goals;
      document.getElementById("save-type").value = "UPDATE";

      const popupForm = document.getElementById("container-popup");
      popupForm.style.display = "flex";

      const deleteButton = document.getElementById("delete-button");
      deleteButton.style.display = "inline-block";
    });
  });

  const closePopup = document.getElementById("close-popup");
  closePopup.addEventListener("click", () => {
    const popupForm = document.getElementById("container-popup");
    popupForm.style.display = "none";
  });

  const saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const playerId = document.getElementById("input-player-id").value;
    const playerPhoto = document.getElementById("input-player-photo").value;
    const newPlayerName = document.getElementById("input-player-name").value;
    const newPlayerNumber = document.getElementById(
      "input-player-number"
    ).value;
    const newPlayerPosition = document.getElementById(
      "input-player-position"
    ).value;
    const newPlayerClub = document.getElementById("input-player-club").value;
    const newPlayerGoals = document.getElementById("input-player-goals").value;

    const saveType = document.getElementById("save-type").value;

    const data = {
      //   id: playerId,
      photo: playerPhoto,
      name: newPlayerName,
      number: newPlayerNumber,
      position: newPlayerPosition,
      club: newPlayerClub,
      goals: newPlayerGoals,
    };
    console.log("bodiiii", data);

    if (saveType === "CREATE") {
      await createPlayer(data);
    }
    if (saveType === "UPDATE") {
      data.id = playerId;
      await updatePlayer(data);
    }
    // await updatePlayer(data);

    renderPlayerList();

    const popupForm = document.getElementById("container-popup");
    popupForm.style.display = "none";
  });

  const deleteButton = document.getElementById("delete-button");

  deleteButton.addEventListener("click", async () => {
    const playerId = document.getElementById("input-player-id").value;
    //const saveType = document.getElementById("save-type").value;

    await deletePlayer(playerId);

    renderPlayerList();
  });
}

function generateAvatar() {
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  console.log(randomNumber);
  return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${randomNumber}.jpg`;
}

export { applyPopupFunctionality };
