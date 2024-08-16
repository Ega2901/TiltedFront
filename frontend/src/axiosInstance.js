// src/axiosInstance.js
import axios from 'axios';

// Получаем CSRF токен из куки
const getCsrfToken = () => {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(cookie => {
            const cookiePair = cookie.split('=');
            if (cookiePair[0].trim() === 'csrftoken') {
                csrfToken = decodeURIComponent(cookiePair[1]);
            }
        });
    }
    return csrfToken;
};

// Создаем экземпляр axios
const axiosInstance = axios.create({
    baseURL: 'https://dfa3-185-167-99-93.ngrok-free.app', // ваш URL ngrok
    headers: {
        'X-CSRFToken': getCsrfToken(),
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default axiosInstance;
