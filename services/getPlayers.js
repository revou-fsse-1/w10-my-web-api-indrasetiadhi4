//import axios from "axios";
import { API_DATABASE } from "../lib/constants.js";
//const axios = require("axios");

async function getAllPlayers() {
  try {
    const response = await axios.get(`${API_DATABASE}/players`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function filterPlayers(keyword) {
  try {
    const response = await axios.get(`${API_DATABASE}/players?q=${keyword}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getAllPlayers, filterPlayers };
