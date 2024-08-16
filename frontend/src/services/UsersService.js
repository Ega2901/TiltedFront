// src/services/UsersService.js
import axios from 'axios';

// Используйте публичный URL вашего бэкенда
const API_URL = 'https://dfa3-185-167-99-93.ngrok-free.app';

export default class UsersService {
    registerUser(user) {
        const url = `${API_URL}/users/register/`;
        return axios.post(url, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getUser(telegram_id) {
        const url = `${API_URL}/users/user/${telegram_id}/`;
        return axios.get(url).then(response => response.data);
    }

    updateUser(user) {
        const url = `${API_URL}/users/update/`;
        return axios.post(url, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
