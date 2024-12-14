import axios from 'axios';

export default class GameService {
    static async getGenres() {
        const response = await axios.get('http://localhost:4200/genres')
        return response.data
    }

    static async getGamesByGenreID(id: number) {
        const response = await axios.get(`http://localhost:4200/genres/${id}`)
        console.log(response.data)
        return response.data
    }
}