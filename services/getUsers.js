//import axios from "axios";
//const axios = require("axios");
import { API_DATABASE } from "../lib/constants.js";

async function getAllUsers() {
  try {
    const response = await axios.get(`${API_DATABASE}/users`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export { getAllUsers };
