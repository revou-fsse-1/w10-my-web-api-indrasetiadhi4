import { getPlayerById } from "../services/getPlayerById.js";
import { createPlayer } from "../services/createPlayer.js";
import { updatePlayer } from "../services/updatePlayer.js";
import { deletePlayer } from "../services/deletePlayer.js";
import { renderPlayerList } from "../dashboard/dashboard.js";

function applyPopupFunctionality() {
  const openPopupNewPlayer = document.getElementById("add-player");
  openPopupNewPlayer.addEventListener("click", async function () {
    const avatarURL = generateAvatar();
    document.getElementById("input-player-id").value = "";
    document.getElementById("input-player-photo").value = avatarURL;
    document.getElementById("input-player-name").value = "";
    document.getElementById("input-player-number").value = "";
    document.getElementById("input-player-position").value = "";
    document.getElementById("input-player-club").value = "";
    document.getElementById("input-player-goals").value = "";

    document.getElementById("save-type").value = "CREATE";

    document.getElementById("img-container").innerHTML = `
        <img
          class="img-avatar-popup"
          src=${avatarURL}
          alt="Avatar"
        />
    `;
    const popupForm = document.getElementById("container-popup");
    popupForm.style.display = "flex";

    const deleteButton = document.getElementById("delete-button");
    deleteButton.style.display = "none";

    const mainPage = document.querySelector("main");
    mainPage.style.opacity = 0.6;
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

      document.getElementById("img-container").innerHTML = `
        <img
          class="img-avatar-popup"
          src=${player.photo}
          alt="Avatar"
        />
    `;

      const popupForm = document.getElementById("container-popup");
      popupForm.style.display = "flex";

      const deleteButton = document.getElementById("delete-button");
      deleteButton.style.display = "inline-block";

      const mainPage = document.querySelector("main");
      mainPage.style.opacity = 0.6;
    });
  });

  const closePopup = document.getElementById("close-popup");
  closePopup.addEventListener("click", () => {
    document.getElementById("img-container").innerHTML = "";

    const popupForm = document.getElementById("container-popup");
    popupForm.style.display = "none";

    const mainPage = document.querySelector("main");
    mainPage.style.opacity = 1;
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

    if (saveType === "CREATE") {
      await createPlayer(data);
    }
    if (saveType === "UPDATE") {
      data.id = playerId;
      await updatePlayer(data);
    }
    // await updatePlayer(data);

    //renderPlayerList();

    const popupForm = document.getElementById("container-popup");
    popupForm.style.display = "none";

    const mainPage = document.querySelector("main");
    mainPage.style.opacity = 1;
  });

  const deleteButton = document.getElementById("delete-button");

  deleteButton.addEventListener("click", async () => {
    const playerId = document.getElementById("input-player-id").value;
    //const saveType = document.getElementById("save-type").value;

    await deletePlayer(playerId);

    renderPlayerList();

    const mainPage = document.querySelector("main");
    mainPage.style.opacity = 1;
  });
}

function generateAvatar() {
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${randomNumber}.jpg`;
}

export { applyPopupFunctionality };
