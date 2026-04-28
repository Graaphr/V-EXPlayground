import axios from 'axios';

const api = axios.create({
    // Sesuaikan dengan alamat Laravel Anda yang sedang jalan
    baseURL: 'http://localhost:8000', 
    withCredentials: true, 
    withXSRFToken: true, 
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

export default api;