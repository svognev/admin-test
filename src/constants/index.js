export const BACKEND_URL = "http://localhost:8000";
export const WS_URL = "ws://localhost:8000/api/ws";

export const TOKEN = (new URLSearchParams(document.location.search)).get("access_token");
export const HEADERS = { "Content-Type": "application/json", "accept": "application/json" };

export const ANIMATIONS = new Set(["cat-1", "cat-2"]);
