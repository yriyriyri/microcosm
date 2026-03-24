import axios from "axios";
import { VOXL_MINI_API_URL } from "./env";

export const voxlMiniClient = axios.create({
  baseURL: VOXL_MINI_API_URL,
});