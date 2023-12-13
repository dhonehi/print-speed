import axios from 'axios';

export const forismaticClient = axios.create({
    baseURL: '/api'
})