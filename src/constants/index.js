export const BACKEND_URL = "http://localhost:8000";
export const TOKEN = (new URLSearchParams(document.location.search)).get("access_token");
export const HEADERS = { "Content-Type": "application/json", "accept": "application/json" };

export const ANIMATIONS = new Set(["cat", "fox", "porcupine", "lion", "eagle", "panda"]);

