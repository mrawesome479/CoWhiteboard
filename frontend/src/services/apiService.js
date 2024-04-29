import axios from 'axios';

const API_URL = 'http://localhost:5002';

export const fetchBoardsForUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/board/getBoardsForUser/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};