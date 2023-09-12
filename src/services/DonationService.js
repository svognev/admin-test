import { BACKEND_URL, TOKEN } from "constants/index";

class DonationService {
  static baseUrl = `${BACKEND_URL}/api/donation`;

  static async getAll() {
    try {
      const url = `${this.baseUrl}/?${new URLSearchParams({ access_token: TOKEN })}&limit=2000`;
      const response = await fetch(url);
      const donations = await response.json();

      if (response.ok && donations?.length) {
        return donations;
      }
    } catch (err) {}

    return [];
  }

  static async getNew() {
    try {
      const url = `${this.baseUrl}?${new URLSearchParams({ access_token: TOKEN })}&limit=2000&load_type=new`;
      const response = await fetch(url);
      const donations = await response.json();

      if (response.ok && donations?.length) {
        return donations;
      }
    } catch (err) {}

    return [];
  }

  static async removeById(donationId) {
    try {
      const url = `${this.baseUrl}/${donationId}?${new URLSearchParams({ access_token: TOKEN })}`;
      const response = await fetch(url, { method: "DELETE" });
      return response.ok;
    } catch (err) {}

    return null;
  }
  
  static async moveToReading(donationId, isWarned) {
    try {
      const url = `${this.baseUrl}/validate/${donationId}/${isWarned ? "warn" : "good"}?${new URLSearchParams({ access_token: TOKEN })}`
      const response = await fetch(url, { method: "PUT" });
      const updatedGoal = await response.json();
      return updatedGoal;
    } catch (err) {}

    return null;
  }

  static async moveToArchive(donationId) {
    try {
      const url = `${this.baseUrl}/read/${donationId}?${new URLSearchParams({ access_token: TOKEN })}`
      const response = await fetch(url, { method: "PUT" });
      const updatedGoal = await response.json();
      return updatedGoal;
    } catch (err) {}

    return null;
  }

  static async returnFromArchive(donationId) {
    try {
      const url = `${this.baseUrl}/unread/${donationId}?${new URLSearchParams({ access_token: TOKEN })}`
      const response = await fetch(url, { method: "PUT" });
      const updatedGoal = await response.json();
      return updatedGoal;
    } catch (err) {}

    return null;
  }

  static async resend(donationId) {
    try {
      const url = `${this.baseUrl}/resend/${donationId}?${new URLSearchParams({ access_token: TOKEN })}`
      const response = await fetch(url, { method: "PUT" });
      const result = await response.json();
      return result;
    } catch (err) {}

    return null;
  }

}

export default DonationService;