import { getAllPlayers, filterPlayers } from "./services/getPlayers.js";
import { applyPopupFunctionality } from "./app/popup.js";
import { applyFilterFunctionality } from "./app/filter.js";

function addPodiumComponent(podium, i) {
  const rank = ["first", "second", "third"];
  var podiumElement = document.getElementById(`podium-${i + 1}`);
  podiumElement.innerHTML = `
    <div class="podium__avatar">
    <img
        class="avatar"
        src=${podium.photo}
        alt="Avatar ${podium.name}"
    />
    </div>
    <p class="podium__city"><b>${podium.name}</b></p>
    <p class="podium__city">${podium.club}</p>
    <div class="podium__rank ${rank[i]}">${podium.goals}</div>
    `;
}

function displayAllPodium(podiums) {
  for (const [i, podium] of podiums.entries()) {
    addPodiumComponent(podium, i);
  }
}

function getTopThreePlayers(players) {
  players.sort((a, b) => b.goals - a.goals);
  const topThreePlayers = players.slice(0, 3);
  return topThreePlayers;
}

async function renderPlayersPodium() {
  const players = await getAllPlayers();
  const podiums = getTopThreePlayers(players);
  displayAllPodium(podiums);
}

function playerComponent(player) {
  return `
  <div class="card">
    <div>
      <button id="button-edit-${player.id}" class="button-edit">
        <img src="assets/edit-button.png" alt="button edit"/>
      </button>
    </div>
    <img class="img-avatar"
      src=${player.photo}
      alt="Avatar ${player.name}"
    />
    <div>
      <h4><b>${player.name}</b></h4>
      <p>${player.club}</p>
      <p> #${player.number} - ${player.position}</p>
      <p class="goals">${player.goals} goals</p>
    </div>
  </div>
  `;
}

function displayPlayerList(players) {
  const playerCardList = players.map((player) => playerComponent(player));
  const cardListWrapper = document.getElementById("player-list");
  cardListWrapper.innerHTML = playerCardList.join("");
}

async function renderPlayerList() {
  const players = await getAllPlayers();
  displayPlayerList(players);
  applyPopupFunctionality();
}

// async function renderPlayerListFromFilter() {
//   const applyFilter = document.getElementById("submit-filter");
//   applyFilter.addEventListener("click", async function () {
//     const keyword = document.getElementById("filter-player").value;
//     const players = await filterPlayers(keyword);
//     displayPlayerList(players);
//   });
// }

async function renderPlayerListFromFilter() {
  const keyword = document.getElementById("filter-player");
  keyword.addEventListener("input", async function () {
    const players = await filterPlayers(keyword.value);
    displayPlayerList(players);
    applyFilterFunctionality();
  });
}

async function renderFootballApp() {
  await renderPlayersPodium();
  await renderPlayerList();
  await renderPlayerListFromFilter();
  //applyPopupFunctionality();
}

addEventListener("DOMContentLoaded", function () {
  renderFootballApp();
});

export { renderPlayerList };
