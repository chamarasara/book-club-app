import { api } from './axios';

export const getBooks = () => api.get('/books').then(r => r.data);
export const getBook = (id) => api.get(`/books/${id}`).then(r => r.data);
export const createBook = (data) => api.post('/books', data).then(r => r.data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data).then(r => r.data);
export const deleteBook = (id) => api.delete(`/books/${id}`);
