import { BACKEND_URL, TOKEN, HEADERS } from "constants/index";

class RuleService {
  static getUrl(goalId) {
    const url = `${BACKEND_URL}/api/rule/${goalId ? `${goalId}/` : ""}?${new URLSearchParams({ access_token: TOKEN })}`;
    return url;
  }

  static async getAll() {
    try {
      const url = this.getUrl();
      const response = await fetch(url);
      const rules = await response.json();

      if (response.ok && rules?.length) {
        rules.sort((a, b) => parseInt(a.amount) - parseInt(b.amount));
        return rules;
      }
    } catch (err) {}

    return [];
  }

  static async create(ruleData) {
    try {
      const url = this.getUrl();
      const response = await fetch(url, { 
        method: "POST",
        body: JSON.stringify(ruleData),
        headers: HEADERS,
      });
      console.warn(112, response, await response.json());
      if (response.ok) {
        return response.ok;
      }

    } catch (err) {}

    return null;
  }

  static async updateById(ruleId, ruleData) {
    try {
      const url = this.getUrl(ruleId);
      const response = await fetch(url, { 
        method: "PUT",
        body: JSON.stringify(ruleData),
        headers: HEADERS,
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {}

    return null;
  }

  static async removeById(ruleId) {
    try {
      const url = this.getUrl(ruleId);
      const response = await fetch(url, { method: "DELETE" });
      return response.ok;
    } catch (err) {}

    return null;
  }
}

export default RuleService;