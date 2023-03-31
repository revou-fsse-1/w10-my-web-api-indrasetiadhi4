// import {
//   getAllPlayers,
//   getPlayerById,
//   addPlayer,
//   updatePlayer,
// } from "./crud.js";

import { getAllPlayers, filterPlayers } from "./services/getPlayers.js";
import { applyPopupFunctionality } from "./popup.js";

const podiums = [
  {
    name: "Ronaldo",
    age: 37,
    club: "Real Madrid",
    goals: 100,
    photo:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/557.jpg",
  },
  {
    name: "Messi",
    age: 35,
    club: "Barcelona",
    goals: 87,
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Neymar",
    age: 29,
    club: "PSG",
    goals: 10,
    photo:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1.jpg",
  },
];

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
    <p class="podium__city">${podium.name}</p>
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

// document.addEventListener(
//   "DOMContentLoaded",
//   function () {
//     renderPlayersPodium();
//   },
//   false
// );

function playerComponent(player) {
  return `
  <div class="card">
    <div>
      <button type="submit" id="button-edit-${player.id}" class="button-edit">
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
  // applyPopupFunctionality();
}

async function renderFootballApp() {
  await renderPlayersPodium();
  await renderPlayerList();
  applyPopupFunctionality();
}

addEventListener("DOMContentLoaded", function () {
  renderFootballApp();
});

export { renderPlayerList };
