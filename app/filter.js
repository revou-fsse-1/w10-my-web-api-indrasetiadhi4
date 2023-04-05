import { getPlayerById } from "../services/getPlayerById.js";
import { createPlayer } from "../services/createPlayer.js";
import { updatePlayer } from "../services/updatePlayer.js";
import { deletePlayer } from "../services/deletePlayer.js";
//import { renderPlayerList } from "../main.js";

function applyFilterFunctionality() {
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
}

export { applyFilterFunctionality };
