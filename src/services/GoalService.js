import { BACKEND_URL, TOKEN, HEADERS } from "constants/index";

class GoalService {
  static getUrl(goalId) {
    const url = `${BACKEND_URL}/api/goal/${goalId ? `${goalId}/` : ""}?${new URLSearchParams({ access_token: TOKEN })}`;
    return url;
  }

  static async getAll() {
    try {
      const url = this.getUrl();
      const response = await fetch(url);
      const goals = await response.json();

      if (response.ok && goals?.length) {
        return goals;
      }
    } catch (err) {}

    return [];
  }

  static async create(goalData) {
    try {
      const url = this.getUrl();

      const response = await fetch(url, { 
        method: "POST", 
        body: JSON.stringify(goalData),
        headers: HEADERS,
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {}

    return null;
  }

  static async updateById(goalId, goalData) {
    try {
      const url = this.getUrl(goalId);
      const response = await fetch(url, { 
        method: "PUT", 
        body: JSON.stringify(goalData),
        headers: HEADERS,
      });
      
      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err) {}

    return null;
  }

  static async removeById(goalId) {
    try {
      const url = this.getUrl(goalId);
      const response = await fetch(url, { method: "DELETE" });
      return response.ok;
    } catch (err) {}

    return null;
  }
  
  static async updateGoalCurrentSum(goalId, goalCurrentSum) {
    try {
      const url = `${BACKEND_URL}/api/goal/${goalId}/${goalCurrentSum}?${new URLSearchParams({ access_token: TOKEN })}`;
      const response = await fetch(url, { method: "PUT" });
      const updatedGoal = await response.json();
      return updatedGoal;
    } catch (err) {}

    return null;
  }
}

export default GoalService;