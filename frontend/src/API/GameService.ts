import axios from "axios";

const baseUrl = process.env.BASE_URL || "http://localhost:4200";

export default class GameService {
  static async getGenres() {
    const response = await axios.get(`${baseUrl}/genres`);
    return response.data;
  }

  static async getGamesByGenreID(id: number) {
    const response = await axios.get(`${baseUrl}/genres/${id}/games`);
    return response.data;
  }

  static getImageUrl(relativePath: string) {
    return `${baseUrl}${relativePath}`;
  }
}
