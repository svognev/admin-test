import { BACKEND_URL, TOKEN } from "constants/index";

class TokenService {
  static getUrl(tokenId = "") {
    const url = `${BACKEND_URL}/api/token/${tokenId ? `${tokenId}/` : ""}?${new URLSearchParams({ access_token: TOKEN })}`;
    return url;
  }

  static async getAll() {
    try {
      const url = this.getUrl();
      const response = await fetch(url);
      const tokens = await response.json();

      if (tokens?.length) {
        tokens.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
        return tokens;
      }
    } catch (err) {}

    return null;
  }

  static async create() {
    try {
      const url = this.getUrl();
      const response = await fetch(url, { method: "POST" });
      const newToken = await response.json();
      return newToken;
    } catch (err) {}

    return null;
  }

  static async removeById(tokenId) {
    try {
      const url = this.getUrl(tokenId);
      const response = await fetch(url, { method: "DELETE" });
      return response.ok;
    } catch (err) {}

    return null;
  }
}

export default TokenService;